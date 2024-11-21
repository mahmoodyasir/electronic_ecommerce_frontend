import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const faqData = [
    {
        question: "What is your return policy?",
        answer: "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship internationally. Shipping costs and delivery times vary depending on your location.",
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive a tracking link via email to monitor its status.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, American Express, PayPal, and other major payment options.",
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach us via our contact page, email us at support@example.com, or call us at 123-456-7890.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 py-12 px-6 mx-3 rounded-xl">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-white text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${openIndex === index ? "transform scale-105 bg-white" : "bg-gray-50"
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-gray-800 focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? (
                                    <ExpandLessIcon className="text-indigo-500" />
                                ) : (
                                    <ExpandMoreIcon className="text-indigo-500" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ${openIndex === index ? "max-h-[200px] p-6" : "max-h-0"
                                    }`}
                                style={{ overflow: "hidden" }}
                            >
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
