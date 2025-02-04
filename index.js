passKey = {
  'k': 'H', 'H': 'k', 'm': 'Z', 'Z': 'm',
  'q': '3', '3': 'q', 'o': 'T', 'T': 'o',
  'D': '9', '9': 'D', 'b': 'O', 'O': 'b',
  'f': '1', '1': 'f', 'B': 'W', 'W': 'B',
  'a': 'S', 'S': 'a', 't': 'N', 'N': 't',
  'u': 'Y', 'Y': 'u', 'd': '6', '6': 'd',
  'g': 'J', 'J': 'g', 'l': 'F', 'F': 'l',
  'z': 'U', 'U': 'z', 'i': 'G', 'G': 'i', 
  'w': 'M', 'M': 'w', 'v': 'V', 'V': 'v', 
  'j': 'Q', 'Q': 'j', 'h': '7', '7': 'h', 
  'y': 'K', 'K': 'y', 'r': '0', '0': 'r', 
  'e': 'X', 'X': 'e', 'C': '2', '2': 'C', 
  'c': 'P', 'P': 'c', 'n': '8', '8': 'n', 
  's': 'R', 'R': 's', 'p': 'I', 'I': 'p', 
  'A': 'L', 'L': 'A', 'E': '4', '4': 'E', 
  'x': '5', '5': 'x', '/': '!', '!': '/',
  '#': '#'
}

function error(text) {
  document.querySelector(".form").style.display = "none";
  document.querySelector(".error").style.display = "inherit";
  document.querySelector("#errortext").innerText = `Error: ${text}`;
}

// Run when the <body> loads
function main() {
  if (window.location.hash) {
    document.querySelector(".form").style.display = "inherit";
    document.querySelector("#password").value = "";
    document.querySelector("#password").focus();
    document.querySelector(".error").style.display = "none";
    document.querySelector("#errortext").innerText = "";

    // Try to get page data from the URL if possible
    var currentUrl = window.location.href.replace("%23", "#");
    
    const linkText = currentUrl.split('#')[1];
    const linkPass = currentUrl.split('#')[2];


    var unlockButton = document.querySelector("#unlockbutton");
    var passwordPrompt = document.querySelector("#password");
    passwordPrompt.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        unlockButton.click();
      }
    });
    unlockButton.addEventListener("click", async () => {
      password = passwordPrompt.value;

      // Decrypt and redirect if possible
        if(password != decryptText(linkPass)) {
          // Password is incorrect.
          error("Password is incorrect.");
          return;

        } else {
          let url = decryptText(linkText);
          const response = await fetch(url)
          if(!response.ok) {
            window.location.href = "https://docs.google.com/spreadsheets/d/" + decryptText(url);
          } else {
          window.location.href = url;
          }
        }
    });
  } else {
    window.location.replace("./create");
  }
}

function decryptText(text) {
  let res = "";
  for (let c of text) {
    res += passKey[c] ?? c;
  }
  return res;
}
