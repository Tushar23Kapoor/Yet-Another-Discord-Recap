let selectedFile = null;
let extractSuccess = true;
let parsedUserData = null;

document.getElementById("filePicker").onclick = async () => {
  showFilePickerPage();
  selectedFile = await window.api.selectFile();
  document.getElementById("filepath").innerText = selectedFile;
  //extractSuccess = false;
};

document.getElementById("unzipButton").onclick = async () => {
  if (!selectedFile) return alert("Pick a file first");

  const output = await window.api.runUnzip(selectedFile);
  document.getElementById("extractResult").innerText = output.result;
  extractSuccess = true;
};

document.getElementById("getUserDetails").onclick = async () => {
  if (!extractSuccess) return alert("Discord Data Packet not extracted sucessfully");

  const output = await window.api.getAvatar();
  showUserDetailsPage(output);
};

function showUserDetailsPage(data) {
  document.getElementById("file-picker").style.display = "none";
  document.getElementById("user-details").style.display = "block";

  // Populate UI using Python data
  document.getElementById("userAvatar").src = data.avatarUrl;
  document.getElementById("username").innerText = data.userName;
}

function showFilePickerPage() {
  document.getElementById("file-picker").style.display = "block";
  document.getElementById("user-details").style.display = "none";

}
