let inputRef = window.document.getElementById("inputField");
let buttonRef = window.document.getElementById("button");
let roastBox = document.getElementById("roastBox");
let loader = document.getElementById("loader");

const defaultText = buttonRef.textContent;

buttonRef.addEventListener('mouseenter', ()=>{
    if(inputRef.value.trim() !== "")
    {
      buttonRef.textContent = "🔥🔥";
      buttonRef.style.background = "#ef4444";
    }
})

buttonRef.addEventListener("mouseleave", () => {
    buttonRef.style.backgroundColor = "";
    buttonRef.textContent = defaultText;
});

buttonRef.addEventListener('click', () => {

     if (inputRef.value.trim() === "") {
        return;
    }

    loader.style.display = "block";

    fetch(`https://api.github.com/users/${inputRef.value}`)
    .then(response => response.json())
    .then(data => {
       let roast = generateRoast(data);
       roastBox.textContent = roast;
    })
    .catch(error => {
        roastBox.textContent = error.message})
    .finally(() => {
        loader.style.display  = "none";
    })
    inputRef.value = ""})
    

    function generateRoast(data) {

    if (data.public_repos < 5) {
        return "🔥🔥 Bro opened GitHub and forgot to code. 🔥🔥";
    }

    if (data.followers < 3) {
        return "🔥🔥 Even your code has more forks than followers. 🔥🔥";
    }

    if (data.following > data.followers) {
        return "🔥🔥 Following everyone hoping someone notices your repos. 🔥🔥";
    }

    return "🔥🔥 Looks like somebody needs to touch some grass 🔥🔥";
}