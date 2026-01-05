let selectedFile = null;

document.getElementById("filePicker").onclick = async () => {
  selectedFile = await window.api.selectFile();
  document.getElementById("file").innerText = selectedFile;
};

document.getElementById("unzipButton").onclick = async () => {
  if (!selectedFile) return alert("Pick a file first");

  const output = await window.api.runUnzip(selectedFile);
  document.getElementById("output").innerText = output;
};