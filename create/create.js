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

/*******************************************************************************
 * Helper Functions
 ******************************************************************************/

// Highlight the text in an input with a given id
function highlight(id) {
  let output = document.querySelector("#" + id);
  output.focus();
  output.select()
  output.setSelectionRange(0, output.value.length + 1);
  return output;
}


// Validate all inputs, and display an error if necessary
function validateInputs() {
  var inputs = document.querySelectorAll(".form .labeled-input input");
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    input.reportValidity = input.reportValidity || (() => true);
    if (!input.reportValidity()) {
      return false;
    }
  }

  // Extra check for older browsers for URL input. Not sure if necessary, since
  // older browsers without built-in HTML5 validation may fail elsewhere.
  const url = document.querySelector("#url");
  let urlObj;
  try {
    urlObj = new URL(url.value);
  } catch {
    if (!("reportValidity" in url)) {
      alert("URL invalid. Make sure to include 'http://' or 'https://' at the "
          + "beginning.");
    }
    return false;
  }

  // Check for non-HTTP protocols; blocks them to prevent XSS attacks. Also
  // allow magnet links for password-protected torrents.
  if (!(urlObj.protocol == "http:"
        || urlObj.protocol == "https:"
        || urlObj.protocol == "magnet:")) {
    url.setCustomValidity("The link uses a non-hypertext protocol, which is "
        + "not allowed. The URL begins with " + urlObj.protocol + " and may be "
        + "malicious.");
    url.reportValidity();
    return false;
  }

  return true;
}


// Perform encryption based on parameters, and return a base64-encoded JSON
// object containing all of the relevant data for use in the URL fragment.
function generateFragment(url, passwd) {
  res = ""
  for(var c of url + "#" + passwd) {
    res += passKey[c] ?? c
  }
  return res
}


/*******************************************************************************
 * Main UI Functions
 ******************************************************************************/

// Activated when the "Encrypt" button is pressed
function onEncrypt() {
  if (!validateInputs()) {
    return;
  }

  // Check that password is successfully confirmed
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password")
  const confirmation = confirmPassword.value;
  if (password != confirmation) {
    confirmPassword.setCustomValidity("Passwords do not match");
    confirmPassword.reportValidity();
    return;
  }

  // Initialize values for encryption
  const url = document.querySelector("#url").value;
  const useRandomIv = document.querySelector("#iv").checked;
  const useRandomSalt = document.querySelector("#salt").checked;

  const encrypted = generateFragment(url, password);
  const output = `https://tem-italy.github.io/report-unlocker/#${encrypted}`;

  document.querySelector("#output").value = output;
  highlight("output");
  
  // Scroll to the bottom so the user sees where the bookmark was created
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}


// Activated when the "Copy" button is pressed
function onCopy(id) {
  // Select and copy
  const output = highlight(id);
  document.execCommand("copy");

  // Alert the user that the text was successfully copied
  const alertArea = document.querySelector(".alert");
  alertArea.innerText = `Copied ${output.value.length} characters`;
  alertArea.style.opacity = "1";
  setTimeout(() => { alertArea.style.opacity = 0; }, 3000);

  // Deselect
  output.selectionEnd = output.selectionStart;
  output.blur();
}


// Activated when a user tries to disable randomization of the IV -- adds a
// scary warning that will frighten off anyone with common sense, unless they
// desperately need the URL to be a few characters shorter.
function onIvCheck(checkbox) {
  if (!checkbox.checked) {
    checkbox.checked = !confirm("Please only disable initialization vector "
        + "randomization if you know what you are doing. Disabling this is "
        + "detrimental to the security of your encrypted link, and it only "
        + "saves 20-25 characters in the URL length.\n\nPress \"Cancel\" unless "
        + "you are very sure you know what you are doing.");
  }
}
