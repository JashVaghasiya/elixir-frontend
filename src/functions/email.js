import emailjs from 'emailjs-com';

export const sendComplain = async (receiver, message, productName, complainID) => {
    emailjs.send("service_iqlj461", "complain", { receiver, productName, complainID, message }, "user_IkjenXXTajWJir7OgDZWS");
}


export const sendResolvedComplain = async (receiverName, productName, receiver, complainID) => {
    emailjs.send("service_iqlj461", "resolve", { receiverName, receiver, productName, complainID }, "user_IkjenXXTajWJir7OgDZWS");
}

export const sendOrderInvoice = async (receiverName, receiver, invoiceLink) => {
    emailjs.send("service_l175bog", "invoice", { receiverName, receiver, invoiceLink }, "user_HAO26UuW5lrGzsj9Fjl8l");
}

export const sendRejectedProduct = async (sellerName, receiver, productId, reason) => {
    emailjs.send("service_l175bog", "reject", { sellerName, receiver, productId, reason }, "user_HAO26UuW5lrGzsj9Fjl8l");
}