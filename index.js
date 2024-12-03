const map = {'k': 'H', 'H': 'k', 'm': 'Z', 'Z': 'm', 'q': '3', '3': 'q', 'o': 'T', 'T': 'o', 'D': '9', '9': 'D', 'b': 'O', 'O': 'b', 'f': '1', '1': 'f', 'B': 'W', 'W': 'B', 'a': 'S', 'S': 'a', 't': 'N', 'N': 't', 'u': 'Y', 'Y': 'u', 'd': '6', '6': 'd', 'g': 'J', 'J': 'g', 'l': 'F', 'F': 'l', 'z': 'U', 'U': 'z', 'i': 'G', 'G': 'i', 'w': 'M', 'M': 'w', 'v': 'V', 'V': 'v', 'j': 'Q', 'Q': 'j', 'h': '7', '7': 'h', 'y': 'K', 'K': 'y', 'r': '0', '0': 'r', 'e': 'X', 'X': 'e', 'C': '2', '2': 'C', 'c': 'P', 'P': 'c', 'n': '8', '8': 'n', 's': 'R', 'R': 's', 'p': 'I', 'I': 'p', 'A': 'L', 'L': 'A', 'E': '4', '4': 'E', 'x': '5', '5': 'x'}


function main() {
    if(!window.location.hash) {
        window.location.replace("./create");
    }
    var passField = document.querySelector('.passwordfield');
    passField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector('.unlockbutton').click();
      }
    });
}


function unlockLink() {
    const passwordField = document.querySelector('.passwordfield');
    const inputPassword = passwordField.value;

    const linkId = window.location.hash.split("#")[1];
    const password = window.location.hash.split("#")[2];

    const decryptedPassword = unhidePassword(password);
    const unlockButton = document.querySelector('.unlockbutton');

    if(inputPassword == decryptedPassword) {
        location.href = "https://docs.google.com/spreadsheets/u/0/d/" + linkId + "/view";
    } else {
        unlockButton.innerHTML = "Wrong Password!";
        setTimeout(() => {
            unlockButton.innerHTML = 'Unlock';
          }, 1500);
    }
}


function unhidePassword(hiddenPassword) {
    let password = "";
    for(let i = 0; i < hiddenPassword.length; i++) {
        password += map[hiddenPassword[i]];
    }
    return password;
}
