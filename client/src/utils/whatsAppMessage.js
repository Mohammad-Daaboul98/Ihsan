const whatsAppMessage = (phoneNumber, imageUrl, userName, password) => {
  let messageContent = "";
  phoneNumber = phoneNumber?.replace(/\s/g, "");

  if (userName) {
    messageContent += `اسم المستخدم: ${userName}\n`;
  }
  if (password) {
    messageContent += `كلمة المرور: ${password}\n`;
  }
  if (imageUrl) {
    messageContent += `هنا\nافتح هذا الرابط لعرض صورة الباركود:\n${imageUrl}`;
  }

  const encodedText = encodeURIComponent(messageContent);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
};

export default whatsAppMessage;
