    const buttons = document.querySelectorAll('.shape-button');
    const image = document.getElementById('clip-image');
    const codeBox = document.getElementById('code-box');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const shape = button.getAttribute('data-shape');
        image.style.clipPath = shape;
        image.style.webkitClipPath = shape;
        codeBox.textContent = 'clip-path: ' + shape + ';';
      });
    });

    // 更新圖片來源
    document.getElementById('update-image').addEventListener('click', () => {
      const url = document.getElementById('image-url').value.trim();
      if (url) {
        image.src = url;
      }
    });



  const popup = document.getElementById("popup");
  const overlay = document.getElementById("popup-overlay");
  const input = document.getElementById("image-url");
  const popupList = document.getElementById("popup-list");

  // 打開 popup
  document.getElementById("open-popup").addEventListener("click", () => {
    popup.style.display = "block";
    overlay.style.display = "block";
  });

  // 關閉 popup
  document.getElementById("popup-close").addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }



  // 載入 JSON 並生成 popup 選項
  fetch("data/images.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "popup-item";
        div.textContent = item.name;
        div.dataset.url = item.url;

        div.addEventListener("click", () => {
          input.value = item.url;
          input.focus();
          closePopup();
        });

        popupList.appendChild(div);
      });
    })
    .catch(err => console.error("載入 JSON 失敗:", err));
