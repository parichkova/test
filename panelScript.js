(()=> {
    const doc = document;
    let toolHolder = null;
    let listOfOptions = null;    
    let closeModal = null;
    let openModal = null;
    let downloadFile = null;
    let closeToolBar = null;
    let isOpenBtn = false;
    let isCloseBtn = false;
    let isDestroyBtn = false;
    let isSaveBtn = false;
    let modal = doc.getElementsByClassName('tr-modal')[0];
    let isBuilt = modal ? modal.classList.contains('hidden') : false;
    
    constructToolBar();
    addEventListeners();

    function constructToolBar() {
        let counter = 3;
        let arrayOfClasses = ['tr-close-modal', 'tr-download-file', 'tr-open-modal'];
        let arrayOfTitles = ['Close Modal', 'Download File', 'Open Modal'];
        let arrayOfinnerHTMLs = [
            '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24">\
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
                <path d="M0 0h24v24H0z" fill="none"/>\
            </svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24">\
                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>\
                <path fill="none" d="M0 0h24v24H0z"/>\
            </svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24">\
                <path d="M0 0h24v24H0z" fill="none"/>\
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/>\
            </svg>'
        ];
        let el = null;
        let child = null;

        toolHolder = doc.createElement('div');
        listOfOptions = doc.createElement('ul');
        closeToolBar = doc.createElement('span');

        while (counter--) {
            el = doc.createElement('li');
            el.classList.add(arrayOfClasses[counter]);
            child = doc.createElement('a');
            child.setAttribute('title', arrayOfTitles[counter]);
            child.setAttribute('href', 'javascript:void(0)');
            child.innerHTML = arrayOfinnerHTMLs[counter];
            el.appendChild(child);
            listOfOptions.appendChild(el);
        }
       
        toolHolder.appendChild(listOfOptions);

        toolHolder.classList.add('tr-tool-holder');
        listOfOptions.classList.add('tr-tool-options-holder');
        closeToolBar.classList.add('tr-toolbar-close-toolbar');
        closeToolBar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="12" height="12" viewBox="0 0 24 24">\
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
            <path d="M0 0h24v24H0z" fill="none"/>\
        </svg>';
        
        toolHolder.appendChild(closeToolBar);
        doc.documentElement.appendChild(toolHolder);
    }

    function addEventListeners() {
        toolHolder.addEventListener('click', function(e) {
            let target = e.target;
            let parent = target;
            let stop = false;

            do {
                if (parent.classList.contains('tr-close-modal')) {
                    isCloseBtn = true;
                    stop = true;
                } else if (parent.classList.contains('tr-open-modal')) {
                    isOpenBtn = true;
                    stop = true;
                } else if (parent.classList.contains('tr-download-file')) {
                    isSaveBtn = true;
                    stop = true;
                } else if (parent.classList.contains('tr-toolbar-close-toolbar')) {
                    isDestroyBtn = true;
                    stop = true;
                }
    
                parent = parent.parentNode;
    
            } while (parent.parentNode && !stop);
    
            handleCallbacks(e);
        });
    }

    function handleCallbacks(e) {
        if (isDestroyBtn) {
            doc.body.removeChild(toolHolder);
            isDestroyBtn = false;
        }
    
        if (isCloseBtn) {
            mainModalLogicHelper.destroyModal();
            isCloseBtn = false;
        }
      
        if (isOpenBtn) {
            if (isBuilt) {
                mainModalLogicHelper.showModal();
            } else {
                mainModalLogicHelper.buildModal();
            }

            isOpenBtn = false;
        }
      
        if (isSaveBtn) {
            modal = doc.getElementsByClassName('tr-modal')[0];

            if (!modal) {
                return;
            }

            mainModalLogicHelper.downloadFile(e);
            isSaveBtn = false;
        }
    }
})();