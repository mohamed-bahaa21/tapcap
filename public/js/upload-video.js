var uploadDiv = document.getElementById("upload-video");
var video = document.getElementById("video");
var file = document.getElementById("file");

var $droparea = $('#upload-video');
var $fileInput = $('#file');

$fileInput.on('dragenter focus click', function () {
    $droparea.addClass('drop-active');
});

// back to normal state
$fileInput.on('dragleave blur drop', function () {
    $droparea.removeClass('drop-active');
});

function dropHandler(e) {
    e.preventDefault();
    [].forEach.call(e.dataTransfer.files, file => {
        uploadDiv.style.display = 'none';
        video.style.display = 'block';
        video.src = '/video/video.mp4';
    });
}
file.onchange = function (e) {
    // console.log(this.files[0]);
    // console.log(this.value);
    uploadDiv.style.display = 'none';
    video.style.display = 'block';
    video.src = '/video/video.mp4';
};