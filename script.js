// script.js
const API_BASE_URL = 'https://alonsoapi.discloud.app/api'; // Assuming your backend is deployed here
//const IMAGE_SERVE_URL = 'https://alonsoapi.discloud.app/public/images'; // Assuming your backend is deployed here
const IMAGE_SERVE_URL = 'https://alonsoapi.discloud.app/images'; // Assuming your backend is deployed here

// --- DOM Elements ---
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const tokenInput = document.getElementById('token-input');
const loginErrorElem = document.getElementById('login-error');
const logoutButton = document.getElementById('logout-button');

const dashboardErrorElem = document.getElementById('dashboard-error');
const singleUploadInput = document.getElementById('single-upload');
const bulkUploadInput = document.getElementById('bulk-upload');
const imagesGrid = document.getElementById('images-grid');
const loadingMessage = document.getElementById('loading-message');
const noImagesMessage = document.getElementById('no-images-message');

const renameModal = document.getElementById('rename-modal');
const closeRenameModalButton = document.getElementById('close-rename-modal');
const modalRenameTitle = document.getElementById('modal-rename-title');
const modalRenameErrorElem = document.getElementById('modal-rename-error');
const modalSavingMessage = document.getElementById('modal-saving-message');
const newFilenameInput = document.getElementById('new-filename-input');
const modalSaveRenameButton = document.getElementById('modal-save-rename-button');
const modalCancelRenameButton = document.getElementById('modal-cancel-rename-button');

// --- FIX: Ensure rename modal is hidden on script load ---
renameModal.style.display = 'none'; 

let currentImageIdForRename = null; // Store ID of image being renamed

// --- Authentication and UI State ---
const checkAuth = async (token) => {
    if (!token) {
        setAuthUI(false);
        return false;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/images`, { headers: { 'Authorization': `Bearer ${token}`,'Access-Control-Allow-Origin': `*` } });
        if (response.ok) {
            setAuthUI(true);
            return true;
        } else {
            localStorage.removeItem('adminToken');
            setAuthUI(false);
            return false;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('adminToken');
        setAuthUI(false);
        return false;
    }
};

const setAuthUI = (isAuthenticated) => {
    if (isAuthenticated) {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        fetchImages();
    } else {
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
        loginErrorElem.classList.add('hidden');
        // No longer pre-fill tokenInput.value here, as it's not displayed in HTML
        // User will type it in manually the first time or if localStorage cleared.
    }
};

// --- API Calls ---
const fetchData = async (url, options = {}) => {
    try {
        const token = localStorage.getItem('adminToken');
        let object = {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                //'Content-Type': options.method === 'PUT' || options.method === 'POST' ? 'application/json' : undefined,
                'Access-Control-Allow-Origin': `*`,
                ...options.headers,
            }
        };
        if(!url.includes("/upload")) {
            object.headers['Content-Type'] = options.method === 'PUT' || options.method === 'POST' ? 'application/json' : undefined;
        }
        const response = await fetch(url, object);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return response.json();
    } catch (error) {
        console.error('API call error:', error);
        dashboardErrorElem.textContent = `Error: ${error.message}`;
        dashboardErrorElem.classList.remove('hidden');
        throw error;
    }
};

const fetchImages = async () => {
    loadingMessage.classList.remove('hidden');
    noImagesMessage.classList.add('hidden');
    imagesGrid.innerHTML = '';
    dashboardErrorElem.classList.add('hidden');
    try {
        const images = await fetchData(`${API_BASE_URL}/images`);
        if (images.length === 0) {
            noImagesMessage.classList.remove('hidden');
        } else {
            images.forEach(addImageCard);
        }
    } finally {
        loadingMessage.classList.add('hidden');
    }
};

const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    console.log(`Uploading ${files.length} files..`)
    dashboardErrorElem.classList.add('hidden');

    const formData = new FormData();
    for (const file of files) {
        console.log(`Apending ${file.name} for formData`)
        formData.append('images', file);
    }
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }

    console.log(`formData`,formData)
    console.log(`formData.keys():`,[...formData.keys()])
    try {
        await fetchData(`${API_BASE_URL}/upload`, { method: 'POST', body: formData, headers: {} }); 
        await fetchImages();
        singleUploadInput.value = '';
        bulkUploadInput.value = '';
    } catch (error) { /* Handled by fetchData */ }
};

const deleteImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image? This cannot be undone.')) {
        return;
    }
    dashboardErrorElem.classList.add('hidden');
    try {
        await fetchData(`${API_BASE_URL}/images/${imageId}`, { method: 'DELETE' });
        await fetchImages();
    } catch (error) { /* Handled by fetchData */ }
};

const renameImage = async (imageId, name) => {
    dashboardErrorElem.classList.add('hidden');
    modalRenameErrorElem.classList.add('hidden');
    modalSavingMessage.classList.add('hidden');

    currentImageIdForRename = imageId;
    modalRenameTitle.textContent = `Rename: "${name}"`;
    newFilenameInput.value = name;
    renameModal.style.display = 'flex';

    modalSaveRenameButton.onclick = async () => {
        const newName = newFilenameInput.value.trim();
        if (!newName || newName === name) {
            modalRenameErrorElem.textContent = 'New name is required and must be different.';
            modalRenameErrorElem.classList.remove('hidden');
            return;
        }

        modalSavingMessage.classList.remove('hidden');
        try {
            await fetchData(`${API_BASE_URL}/images/${currentImageIdForRename}/rename`, {
                method: 'PUT',
                body: JSON.stringify({ newOriginalFilename: newName })
            });
            await fetchImages();
            closeRenameModal();
        } catch (error) {
            modalRenameErrorElem.textContent = `Rename failed: ${error.message}`;
            modalRenameErrorElem.classList.remove('hidden');
        } finally {
            modalSavingMessage.classList.add('hidden');
        }
    };

    modalCancelRenameButton.onclick = closeRenameModal;
};

const closeRenameModal = () => {
    renameModal.style.display = 'none';
    currentImageIdForRename = null;
    newFilenameInput.value = '';
};


// --- UI Rendering Functions ---
const addImageCard = (image) => {
    const card = document.createElement('div');
    card.className = 'card-bg rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-6';
    let imageLink = `${IMAGE_SERVE_URL}/${image.name}`;
    card.innerHTML = `
        <img src="${imageLink}" alt="${image.name}" 
             style="margin-bottom: 6px; !important" class="w-full h-40 object-contain mb-5 rounded-md border border-gray-700 bg-gray-900" 
             onerror="this.onerror=null;this.src='${IMAGE_SERVE_URL}/default_image.png';">
        <p style="margin-bottom: 6px; white-space: normal; overflow-wrap: break-word;" class="text-lg font-medium text-gray-100 mb-3 truncate w-full text-center" title="${image.name}">
            ${image.name}
        </p>
        <p class="text-xs text-gray-400 mb-4" style="margin-bottom: 5px !important;">ID: ${image.id}</p>
        <p class="text-xs text-gray-400 mb-4" style="margin-bottom: 5px !important;">Created at: ${image.created_at}</p>
        <div style="margin-top: 6px; !important" class="flex flex-wrap gap-3 justify-center mt-auto w-full">
            <button data-action="rename" data-id="${image.id}" data-name="${image.name}" 
                    class="flex-1 btn-gradient text-white text-sm px-4 py-2 rounded-lg shadow-md transition duration-200">
                Rename
            </button>
            <button data-action="delete" data-id="${image.id}" 
                    class="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition duration-200">
                Delete
            </button>
        </div>
        <div style="margin-top: 6px; !important" class="flex flex-wrap gap-3 justify-center mt-auto w-full">
            <button data-id="${image.id}" data-name="${image.name}" 
                    oncontextmenu="(()=>window.open('${imageLink}','_blank'))(); return false;"
                    onclick="copyTextToClipboard('${imageLink}')"
                    class="flex-1 btn-gradient text-white text-sm px-4 py-2 rounded-lg shadow-md transition duration-200">
                Copy image link 🔗
            </button>
        </div>
    `;
    imagesGrid.appendChild(card);
};
function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.bottom= 0;
  textArea.style.left= 0;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  //alert('You text was copied! Ready to paste!\n\nThanks for using our tool!\n- AlonsoAliaga');

  document.body.removeChild(textArea);
}
// --- Event Listeners ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = tokenInput.value;
    localStorage.setItem('adminToken', token);
    const isAuthenticated = await checkAuth(token);
    if (!isAuthenticated) {
        loginErrorElem.textContent = 'Invalid token. Please try again.';
        loginErrorElem.classList.remove('hidden');
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    setAuthUI(false);
});

singleUploadInput.addEventListener('change', (e) => uploadFiles(e.target.files));
bulkUploadInput.addEventListener('change', (e) => uploadFiles(e.target.files));

imagesGrid.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;
    const name = button.dataset.name;

    if (action === 'delete') deleteImage(id);
    else if (action === 'rename') renameImage(id, name);
});

// Modal Listeners
closeRenameModalButton.addEventListener('click', closeRenameModal);
window.addEventListener('click', (e) => { // Close modal when clicking outside
    if (e.target === renameModal) closeRenameModal();
});


// Initial check when page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedToken = localStorage.getItem('adminToken');
    checkAuth(storedToken);
});

