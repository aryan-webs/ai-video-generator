document.getElementById("generateBtn").addEventListener("click", generate);

async function generate() {

  let prompt = document.getElementById("prompt").value;
  let loading = document.getElementById("loading");
  let results = document.getElementById("results");

  // ✅ 1. Empty check
  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // ✅ 2. Banned words (updated)
  const bannedWords = ["sex", "porn", "xxx"];

  if (bannedWords.some(word => prompt.toLowerCase().includes(word))) {
    alert("Not allowed 🚫");
    return;
  }

  // ✅ UI reset
  results.innerHTML = "";
  loading.style.display = "block";

  try {
    let response = await fetch(`/.netlify/functions/pexels?query=${prompt}`);
    let data = await response.json();

    loading.style.display = "none";

    // ✅ No result case
    if (!data.videos || data.videos.length === 0) {
      results.innerHTML = "No clips found 😢";
      return;
    }

    // ✅ Show videos
    data.videos.forEach(video => {
      let vid = document.createElement("video");

      vid.src = video.video_files[0].link;
      vid.controls = true;
      vid.width = "300";

      results.appendChild(vid);
    });

  } catch (error) {
    loading.style.display = "none";
    results.innerHTML = "Something went wrong ❌";
  }
}
