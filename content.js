chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "negotiate") {
    // Add your negotiation logic here
    alert("Negotiation feature coming soon!");
  }
});