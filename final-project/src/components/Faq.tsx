const faqData = [
  {
    question:
      "What are the types of delivery and delivery times for a Mango order?",
    answer:
      "We offer standard and express delivery options. Standard delivery typically takes 3–5 business days, while express delivery arrives within 1–2 business days. Delivery times may vary depending on your location and the availability of the items.",
  },
  {
    question: "How can I exchange or return an online purchase?",
    answer:
      "To exchange or return an item, simply log in to your account, access your order history, and select the item you wish to return. Follow the return instructions provided. Returns are accepted within 30 days of purchase as long as the items are unused and in their original condition.",
  },
  {
    question: "How and when will I receive my refund?",
    answer:
      "Once we receive and inspect your returned items, your refund will be processed within 3–7 business days. The amount will be returned to your original payment method. You’ll receive a confirmation email once the refund is issued.",
  },
  {
    question: "How can I obtain an invoice for my purchase?",
    answer:
      "You can download your invoice directly from your account under “Order History.” Each completed order includes a downloadable PDF invoice. If you checked out as a guest, you can request the invoice via our customer support.",
  },
  {
    question: "I have a promotional code. How do I use it?",
    answer:
      "Enter your promotional code at checkout in the “Discount Code” field before completing your purchase. The discount will be automatically applied to eligible items. Only one code may be used per order.",
  },
  {
    question: "How can I buy a physical gift card?",
    answer:
      "Physical gift cards are available for purchase at selected retail locations. Please check our store locator to find a participating location near you. At this time, gift cards are not sold online.",
  },
  {
    question: "How can I use a gift card or find out the available balance?",
    answer:
      "To use your gift card, enter the card number during checkout in the “Gift Card” section. To check your balance, visit our Gift Card Balance page and input your card details. You can also inquire in-store.",
  },
];

const Faq = () => {
  return (
    <section className="w-full flex flex-col gap-10 px-6 py-15 md:px-10 lg:px-20">
      <h2 className="text-3xl text-balance md:text-4xl lg:text-5xl text-center font-bold">
        Frequently Asked Questions
      </h2>
      <div className="w-full flex flex-col gap-3">
        {faqData.map(({ question, answer }, index) => (
          <details
            key={index}
            className="group w-full border dark:border-neutral-500 rounded-md open:shadow-md open:bg-black open:text-stone-200 dark:text-neutral-300 open:border-black"
          >
            <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-left text-base md:text-lg list-none marker:hidden">
              <span className="text-balance">{question}</span>
              <svg
                className="w-5 h-5 transform transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="px-5 pb-10 text-sm text-pretty">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
