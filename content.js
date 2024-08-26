let currentPrice = 0;

function addNegotiateButton() {
  const messageHostLink = document.querySelector('a[href*="/contact_host/"][href*="/send_message"]');
  if (messageHostLink && !document.getElementById('negotiate-button')) {
    const negotiateButton = document.createElement('a');
    negotiateButton.id = 'negotiate-button';
    negotiateButton.textContent = 'Negotiate';
    negotiateButton.href = '#';
    negotiateButton.className = messageHostLink.className;
    negotiateButton.style.marginLeft = '10px';
    negotiateButton.style.backgroundColor = '#FF0000'; // Bright red
    negotiateButton.style.borderColor = '#FF0000'; // Matching border color
    negotiateButton.addEventListener('click', startNegotiation);
    messageHostLink.parentNode.insertBefore(negotiateButton, messageHostLink.nextSibling);
  }
}

function extractPrice() {
  const priceElement = document.querySelector('span._11jcbg2');
  if (priceElement) {
    const priceText = priceElement.textContent;
    console.log("Price text found:", priceText);
    
    // Extract the price using a regex
    const priceMatch = priceText.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    if (priceMatch) {
      currentPrice = parseInt(priceMatch[1].replace(/,/g, ''));
      console.log("Extracted price:", currentPrice);
    } else {
      console.log("Could not extract price from:", priceText);
    }
  } else {
    console.log("Price element with class '_11jcbg2' not found");
  }

  if (currentPrice === 0 || isNaN(currentPrice)) {
    console.log("Price is still zero or NaN. Please check the page structure.");
  }
}

function startNegotiation(event) {
  event.preventDefault();
  extractPrice(); // Extract price right before negotiation starts
  if (currentPrice === 0 || isNaN(currentPrice)) {
    alert("Couldn't find the price. Please try again.");
    return;
  }
  const messageHostLink = document.querySelector('a[href*="/contact_host/"][href*="/send_message"]');
  if (messageHostLink) {
    messageHostLink.click();
    setTimeout(sendNegotiationMessage, 3000);
  }
}

function sendNegotiationMessage() {
  const messageInput = document.querySelector('textarea[aria-label="Message the Host"]');
  if (messageInput) {
    const negotiatedPrice = Math.round(currentPrice * 0.8);
    const message = `Hi - I am interested in renting your property. The price I see is $${currentPrice} (total before taxes). This is slightly outside my budget. Can you do $${negotiatedPrice} (total before taxes)? Thank you for considering this.`;
    messageInput.value = message;
    messageInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Trigger a change event as well
    const changeEvent = new Event('change', { bubbles: true });
    messageInput.dispatchEvent(changeEvent);
  } else {
    console.log("Message input not found");
  }
}

// Run when the page loads
extractPrice();
addNegotiateButton();

// Observe DOM changes to add the button if it's not immediately available
const observer = new MutationObserver(() => {
  extractPrice();
  addNegotiateButton();
});

observer.observe(document.body, { childList: true, subtree: true });