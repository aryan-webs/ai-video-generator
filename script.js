document.getElementById("generateBtn").addEventListener("click", generate);

async function generate() {

    let prompt = document.getElementById("prompt").value;
    let loading = document.getElementById("loading");
    let results = document.getElementById("results");

    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    results.innerHTML = "";
    loading.style.display = "block";

    try {

        let response = await fetch(`/.netlify/functions/pexels?query=${prompt}`);

        let data = await response.json();

        loading.style.display = "none";

        if (!data.videos || data.videos.length === 0) {
            results.innerHTML = "No clips found 😢";
            return;
        }

        data.videos.forEach(video => {

            let vid = document.createElement("video");

            vid.src = video.video_files[0].link;

            vid.controls = true;

            results.appendChild(vid);

        });

    } catch (error) {

        loading.style.display = "none";

        results.innerHTML = "Something went wrong ❌";

    }

}
