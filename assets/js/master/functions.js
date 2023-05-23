// ? @@@@@@@@@@@@@@@@@@@@@@[  Invalid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function invalid(event) {
  // event.preventDefault();
  event.stopPropagation();
  $(event.currentTarget).find('[type=submit]').attr('disabled', true);
}

// ? @@@@@@@@@@@@@@@@@@@@@@[  Stop Refresh Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function stopRefresh(event) {
  event.preventDefault();
  event.stopPropagation();
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  On Load Form Data  ]@@@@@@@@@@@@@@@@@@@@@@
let loaded_form_params = {};
export function onload_form(event,form,formInputs) {

  if (!form.checkValidity()) {
    $(form).find('[type=submit]').attr('disabled', true);
    event.preventDefault();
    event.stopPropagation();

  } else {
    loaded_form_params = {};

    for (let i = 0; i < formInputs.length; i++) {

      if(formInputs[i].hasAttribute('name')){
        loaded_form_params[formInputs[i].name] = formInputs[i].value;
      }

      if(i === formInputs.length-1){

        if(formInputs.hasAttribute('tokenKeyOff')){
          delete loaded_form_params._token
        }

        loaded_form_params = JSON.stringify(Object.entries(loaded_form_params).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));
        
        if(formInputs.hasAttribute('data-match')) {
          $(form).find('[type=submit]').attr('disabled', true);
          event.preventDefault();
          event.stopPropagation();
        } else {
          $(form).find('[type=submit]').attr('disabled', false);
          event.preventDefault();
          event.stopPropagation();
        } 

        return loaded_form_params;
      }

    }

    event.preventDefault();
    event.stopPropagation();
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Valid Form  ]@@@@@@@@@@@@@@@@@@@@@@
let after_input_params = {};
export function valid(event,form,formInputs) {

  after_input_params = {};
  for (let i = 0; i < formInputs.length; i++) {
    if(formInputs[i].hasAttribute('name')){
      after_input_params[formInputs[i].name] = formInputs[i].value;
    }
    if(i === formInputs.length-1){

      if(formInputs.hasAttribute('tokenKeyOff')){
        delete after_input_params._token
      }

      after_input_params = JSON.stringify(Object.entries(after_input_params).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));
      
      if(formInputs.hasAttribute('data-match')) {
        if(loaded_form_params===after_input_params){
          $(form).find('[type=submit]').attr('disabled', true);
          event.preventDefault();
          event.stopPropagation();
        } else {
          $(form).find('[type=submit]').attr('disabled', false);
          event.preventDefault();
          event.stopPropagation();
        }   
      } else {
        $(form).find('[type=submit]').attr('disabled', false);
      } 

      return after_input_params;
    }
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Submit With Invalid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function submitWithInvalid(event) {
  $(event.target).find('[type=submit]').attr('disabled', true);
  $(event.target).removeClass('submited');
  event.preventDefault();
  event.stopPropagation();
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Submit With Valid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function submitWithValid(event) {
  $(event.currentTarget).find('[type=submit]').attr('disabled', false);
  $(event.currentTarget).addClass('submited');
  return after_input_params;
}





// ? @@@@@@@@@@@@@@@@@@@@@@[  Show Password  ]@@@@@@@@@@@@@@@@@@@@@@
export function showPassword(event) {
  let showPass = $($(event.currentTarget).attr("data-input"));
  if (event.currentTarget.checked == true) {
    showPass.attr("type", "text");
  } else {
    showPass.attr("type", "password");
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Sweet alert  ]@@@@@@@@@@@@@@@@@@@@@@

  // export function sweetalert(title,icon){
  //   Swal.fire({
  //     position: 'center',
  //     icon: icon,
  //     text: title,
  //     showConfirmButton: false,
  //     timer: 2000
  //   })
  // }







// const dropzones = document.querySelectorAll('.dropzone');
// let imagePaths = {};
// dropzones.forEach(dropzone => {
//   const input = dropzone.querySelector('input[type="file"]');
//   const preview = dropzone.querySelector('.preview');
//   const is_required = dropzone.querySelector('[data-required]');
//   const is_multiple = dropzone.querySelector('[multiple]');
//   const form = dropzone.closest('form');
//   const inputName = input.getAttribute('name'); // get the input name attribute
//   let resetBtn = "";
//   let submitBtn = "";
//   if(form) {
//     resetBtn = form.querySelector('[type=reset]');
//     submitBtn = form.querySelector('[type=submit]');
//   }

//   dropzone.addEventListener('dragover', e => {
//     e.preventDefault();
//     dropzone.classList.add('dropzone-over');
//   });

//   dropzone.addEventListener('dragleave', e => {
//     e.preventDefault();
//     dropzone.classList.remove('dropzone-over');
//   });

//   dropzone.addEventListener('drop', e => {
//     e.preventDefault();
//     dropzone.classList.remove('dropzone-over');
//     const files = e.dataTransfer.files;
//     let filess = files;
//     if (!is_multiple) {
//       preview.innerHTML = "";
//     }
//     handleFiles(filess, preview, dropzone, input, form, inputName, is_required, is_multiple, resetBtn, submitBtn);
//   });

//   input.addEventListener('change', e => {
//     const files = input.files;
//     if (!is_multiple) {
//       preview.innerHTML = "";
//     }
//     handleFiles(files, preview, dropzone, input, form, inputName, is_required, is_multiple, resetBtn, submitBtn);
//   });
// });

// function handleFiles(files, preview, dropzone, input, form, inputName, is_required, is_multiple, resetBtn, submitBtn) {
//   const min = input.dataset.min ? parseInt(input.dataset.min) : 0;
//   const max = input.dataset.max ? parseInt(input.dataset.max) : Infinity;
  
//   if (files.length < min || files.length > max) {
//     sweetalert(`Please upload between ${min} and ${max} files.`, "warning");
//     return false;
//   }

//   let fileLength = files.length;
//   if(!is_multiple) {
//     imagePaths[inputName] = [];
//     fileLength = 1;
//   }
//   for (let i = 0; i < fileLength; i++) {
//     const file = files[i];

//     if (file.type.startsWith('image/')) {
//     const reader = new FileReader();

//     reader.onload = function(e) {
//       const imageContainer = document.createElement("div");
//       imageContainer.classList.add("image-container","col-xxl-4","col-6","order-last");
      
//       const imageContainerInner = document.createElement("div");
//       imageContainerInner.classList.add("image-container-inner","position-relative");
                
//       // const image = document.createElement("img");
//       // image.src = e.target.result;

//       const image = new Image();
//       image.src = e.target.result;
      
//         image.onload = function() {
//           const previewImage = document.createElement("img");
//           if((image.src).split(";")[0] == "data:image/gif"){
//             previewImage.src = e.target.result;
//           } else{
//             const canvas = document.createElement("canvas");
//             const MAX_WIDTH = 400;
//             const MAX_HEIGHT = 400;
//             let width = image.width;
//             let height = image.height;
    
//             if (width > height) {
//               if (width > MAX_WIDTH) {
//                 height *= MAX_WIDTH / width;
//                 width = MAX_WIDTH;
//               }
//             } else {
//               if (height > MAX_HEIGHT) {
//                 width *= MAX_HEIGHT / height;
//                 height = MAX_HEIGHT;
//               }
//             }
    
//             canvas.width = width;
//             canvas.height = height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(image, 0, 0, width, height);
    
//             const thumbnail = canvas.toDataURL(`image/png`);
//             previewImage.src = thumbnail;
//           }
  
//           const removeButton = document.createElement("button");
//           removeButton.classList.add("remove-image");
//           removeButton.addEventListener("click", function() {
//             imageContainer.remove();
//             updateHiddenInput();
//             if(form) {
//               form.checkValidity();
//             }
  
//             let removeImageCount = 1;
//             imagePaths[inputName] = imagePaths[inputName].filter(path => {
//               if(removeImageCount==1 && path == e.target.result){
//                 removeImageCount++;
//               }else{
//                 return path;
//               }
//             });
//             if (preview.querySelectorAll('.image-container').length === 0) {
//               dropzone.classList.remove('has-images');
//               if (is_required) {
//                 input.required = true;
                
//                 if(form) {
//                   if(submitBtn) {
//                     submitBtn.disabled = true;
//                   }
//                 }
//               }
              
//               input.value = '';
              
//             }
            
  
//             const imageContainers = preview.querySelectorAll('.image-container');
//             updateHiddenInput();
//             if(form) {
//               form.checkValidity();
//             }
            
//             if (imagePaths.length === 0 && imageContainers.length === 0) {
//               input.value = '';
//             }
//           });
  

//           imageContainer.appendChild(imageContainerInner);
//           imageContainerInner.appendChild(previewImage);
//           imageContainerInner.appendChild(removeButton);
//           preview.appendChild(imageContainer);
  
//           dropzone.classList.add('has-images');
          
//           input.required = false;
//           if(form) {
//             form.checkValidity();
//           }
  
          
//           if (!imagePaths[inputName]) {
//             imagePaths[inputName] = [];
//           }
//           imagePaths[inputName].push(e.target.result);
//           updateHiddenInput();
  
          
//           // console.log(`Image paths for ${inputName}:`, imagePaths[inputName]);
          
//         }
      
//     }

//     reader.readAsDataURL(file);
//     }
//     else if (file.type.startsWith('video/')) {
//       const videoContainer = document.createElement("div");
//       videoContainer.classList.add("image-container","col-xxl-4","col-sm-6");
      
//       const videoContainerInner = document.createElement("div");
//       videoContainerInner.classList.add("image-container-inner","position-relative","bg-light");
      
//       const videoIcon = document.createElement("i");
//       videoIcon.title = file.name;
//       videoIcon.classList.add("otherFilesIcon");
      
//       const videoText = document.createElement("i");
//       videoText.classList.add("otherFilesExtension");
//       let ext = (file.name).split(".");
//       videoText.innerText = ext[ext.length - 1];
      
//       const videoContainerBox = document.createElement("div");
//       videoContainerBox.classList.add("image-container-box","position-relative", ext[ext.length - 1]);

//       const videoName = document.createElement("span");
//       videoName.classList.add("otherFilesName");
//       videoName.title = file.name;
//       videoName.innerText = file.name;

//       const removeButton = document.createElement("button");
//       removeButton.classList.add("remove-image");
//       removeButton.addEventListener("click", function() {
//         videoContainer.remove();
//         imagePaths[inputName] = imagePaths[inputName].filter(path => path !== file.name);
//         if (preview.querySelectorAll('.image-container').length === 0) {
//           dropzone.classList.remove('has-images');
//           if (is_required) {
//             input.required = true;
            
//             if(form) {
//               if(submitBtn) {
//                 submitBtn.disabled = true;
//               }
//             }
//           }
          
//           input.value = '';
          
//         }
//         const videoContainers = preview.querySelectorAll('.image-container');
//         updateHiddenInput();
//         if(form) {
//           form.checkValidity();
//         }
          
//         if (imagePaths.length === 0 && videoContainers.length === 0) {
//           input.value = '';
//         }
//       });

//       videoContainer.appendChild(videoContainerInner);
//       videoContainerInner.appendChild(videoContainerBox);
//       videoContainerBox.appendChild(videoIcon);
//       videoContainerBox.appendChild(videoText);
//       videoContainerInner.appendChild(videoName);
//       videoContainerInner.appendChild(removeButton);
//       preview.appendChild(videoContainer);

//       dropzone.classList.add('has-images');
      
//       input.required = false;
//       if(form) {
//         form.checkValidity();
//       }

//       if (!imagePaths[inputName]) {
//         imagePaths[inputName] = [];
//       }
//       imagePaths[inputName].push(file.name);
//       updateHiddenInput();

//       console.log(`Video paths for ${inputName}:`, imagePaths[inputName]);
//     }
//     else {
//       const otherFilesContainer = document.createElement("div");
//       otherFilesContainer.classList.add("image-container","col-xxl-4","col-sm-6");
      
//       const otherFilesContainerInner = document.createElement("div");
//       otherFilesContainerInner.classList.add("image-container-inner","position-relative","bg-light");

//       const otherFilesIcon = document.createElement("i");
//       otherFilesIcon.title = file.name;
//       otherFilesIcon.classList.add("otherFilesIcon");
      
//       const otherFilesText = document.createElement("i");
//       otherFilesText.classList.add("otherFilesExtension");
//       let ext = (file.name).split(".");
//       otherFilesText.innerText = ext[ext.length - 1];
      
//       const otherFilesContainerBox = document.createElement("div");
//       otherFilesContainerBox.classList.add("image-container-box","position-relative", ext[ext.length - 1]);

//       const otherFilesName = document.createElement("span");
//       otherFilesName.classList.add("otherFilesName");
//       otherFilesName.title = file.name;
//       otherFilesName.innerText = file.name;

//       const removeButton = document.createElement("button");
//       removeButton.classList.add("remove-image");
//       removeButton.addEventListener("click", function() {
//         otherFilesContainer.remove();
//         imagePaths[inputName] = imagePaths[inputName].filter(path => path !== file.name);
//         if (preview.querySelectorAll('.image-container').length === 0) {
//           dropzone.classList.remove('has-images');
//           if (is_required) {
//             input.required = true;
            
//             if(form) {
//               if(submitBtn) {
//                 submitBtn.disabled = true;
//               }
//             }
//           }
          
//           input.value = '';
          
//         }
//         const otherFilesContainers = preview.querySelectorAll('.image-container');
//         updateHiddenInput();
//         if(form) {
//           form.checkValidity();
//         }
          
//         if (imagePaths.length === 0 && otherFilesContainers.length === 0) {
//           input.value = '';
//         }
//       });

//       otherFilesContainer.appendChild(otherFilesContainerInner);
//       otherFilesContainerInner.appendChild(otherFilesContainerBox);
//       otherFilesContainerBox.appendChild(otherFilesIcon);
//       otherFilesContainerBox.appendChild(otherFilesText);
//       otherFilesContainerInner.appendChild(otherFilesName);
//       otherFilesContainerInner.appendChild(removeButton);
//       preview.appendChild(otherFilesContainer);

//       dropzone.classList.add('has-images');
      
//       input.required = false;
//       if(form) {
//         form.checkValidity();
//       }

//       if (!imagePaths[inputName]) {
//         imagePaths[inputName] = [];
//       }
//       imagePaths[inputName].push(file.name);
//       updateHiddenInput();

//       // console.log(`otherFiles paths for ${inputName}:`, imagePaths[inputName]);
//     }

//   }

//   if(resetBtn) {
//   resetBtn.addEventListener("click", function() {
//     dropzone.classList.remove('has-images');
//     if (is_required) {
//       input.required = true;
      
//       if(form) {
//         if(submitBtn) {
//           submitBtn.disabled = true;
//         }
//       }
//     }
//     preview.innerHTML = "";
//     imagePaths[inputName] = "";
//     input.value = '';
//     updateHiddenInput();
//     if(form) {
//       form.checkValidity();
//     }
//   });
//   }

//   function updateHiddenInput() {
//     const hiddenInput = dropzone.querySelector('input[type="hidden"]');
//     hiddenInput.value = JSON.stringify(imagePaths[inputName]);
//     // console.log(`Image paths for ${inputName}:`, imagePaths[inputName]);
//   }

//   if(form) {
//     if (form.checkValidity()) {
//       if(submitBtn) {
//         submitBtn.disabled = false;
//       }
//     }
//     form.classList.add('was-validated');
//   }

// };






