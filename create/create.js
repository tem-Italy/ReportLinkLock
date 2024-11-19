const map = {'k': 'H', 'H': 'k', 'm': 'Z', 'Z': 'm', 'q': '3', '3': 'q', 'o': 'T', 'T': 'o', 'D': '9', '9': 'D', 'b': 'O', 'O': 'b', 'f': '1', '1': 'f', 'B': 'W', 'W': 'B', 'a': 'S', 'S': 'a', 't': 'N', 'N': 't', 'u': 'Y', 'Y': 'u', 'd': '6', '6': 'd', 'g': 'J', 'J': 'g', 'l': 'F', 'F': 'l', 'z': 'U', 'U': 'z', 'i': 'G', 'G': 'i', 'w': 'M', 'M': 'w', 'v': 'V', 'V': 'v', 'j': 'Q', 'Q': 'j', 'h': '7', '7': 'h', 'y': 'K', 'K': 'y', 'r': '0', '0': 'r', 'e': 'X', 'X': 'e', 'C': '2', '2': 'C', 'c': 'P', 'P': 'c', 'n': '8', '8': 'n', 's': 'R', 'R': 's', 'p': 'I', 'I': 'p', 'A': 'L', 'L': 'A', 'E': '4', '4': 'E', 'x': '5', '5': 'x'}


function copyOutput() {
    
    const outputField = document.querySelector('.outputfield');
  
    
    navigator.clipboard.writeText(outputField.value)
      .then(() => {
        const copyButton = document.querySelector('.copybutton');
        copyButton.innerHTML = 'Copied!';
        setTimeout(() => {
          copyButton.innerHTML = 'Copy';
        }, 1500);
      })
      .catch(err => {
        
        console.error('Failed to copy: ', err);
      });
  }

function lockLink() {
    const linkField = document.querySelector('.testreportfield');
    const passwordField = document.querySelector('.passwordfield');
    const linkID = extractLinkId(linkField.value);
    const password = passwordField.value;

    hiddenPassword = hidePassword(password);

    const outputUrl = "https://tem-italy.github.io/ReportLinkLock/#" + linkID + "#" + hiddenPassword;
    const outputField = document.querySelector('.outputfield');
    outputField.value = outputUrl;
}


function extractLinkId(link) {
    // Split the link by '/'
    const parts = link.split('/');
  
    // Find the index of 'edit' in the parts array
    const editIndex = parts.indexOf('d');
  
    // Check if 'edit' is found and return the previous part (LINK_ID)
    if (editIndex > 0) {
      return parts[editIndex + 1];
    } else {
      // Return null if 'edit' is not found
      return null;
    }
  }

function hidePassword(password) {
    let hiddenPassword = '';
    for (let i = 0; i < password.length; i++) {
      hiddenPassword += map[password[i]];
    }
      return hiddenPassword;
}
