import { TextField, Button, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <Typography variant="h6" className="font-bold text-xl mb-4">
                        About Us
                    </Typography>
                    <Typography variant="body2" className="text-gray-400 leading-relaxed">
                        Explore the world of electronics with us. We offer the latest gadgets, unbeatable prices, and excellent customer service. Join our tech-savvy community today!
                    </Typography>
                </div>

                {/* Quick Links */}
                <div>
                    <Typography variant="h6" className="font-bold text-xl mb-4">
                        Quick Links
                    </Typography>
                    <nav className="flex flex-col gap-2">
                        <a href="#home" className="text-gray-400 hover:text-white transition">
                            Home
                        </a>
                        <a href="#products" className="text-gray-400 hover:text-white transition">
                            Products
                        </a>
                        <a href="#about" className="text-gray-400 hover:text-white transition">
                            About Us
                        </a>
                        <a href="#contact" className="text-gray-400 hover:text-white transition">
                            Contact
                        </a>
                    </nav>
                </div>

                {/* Newsletter Subscription */}
                <div>
                    <Typography variant="h6" className="font-bold text-xl mb-4">
                        Stay Connected
                    </Typography>
                    <Typography variant="body2" className="text-gray-400 leading-relaxed mb-4">
                        Subscribe to our newsletter for updates on new arrivals, discounts, and the latest news in tech.
                    </Typography>
                    <form className="flex items-center gap-2">
                        <TextField
                            variant="outlined"
                            placeholder="Enter your email"
                            type="email"
                            required
                            sx={{
                                bgcolor: "white",
                                borderRadius: "9999px",
                                flex: 1,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9999px",
                                    "& fieldset": { borderColor: "transparent" },
                                    "&:hover fieldset": { borderColor: "transparent" },
                                    "&.Mui-focused fieldset": { borderColor: "transparent" },
                                },
                                "& input": { padding: "10px 20px", color: "gray" },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-700"></div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                {/* Social Icons */}
                <div className="flex gap-4">
                    <IconButton href="#facebook" className="text-gray-400 hover:text-white transition">
                        <Facebook />
                    </IconButton>
                    <IconButton href="#twitter" className="text-gray-400 hover:text-white transition">
                        <Twitter />
                    </IconButton>
                    <IconButton href="#instagram" className="text-gray-400 hover:text-white transition">
                        <Instagram />
                    </IconButton>
                    <IconButton href="#linkedin" className="text-gray-400 hover:text-white transition">
                        <LinkedIn />
                    </IconButton>
                </div>

                {/* Copyright */}
                <Typography variant="body2" className="text-gray-400 mt-4 md:mt-0">
                    © {new Date().getFullYear()} Electronic Gadgets Shop. All rights reserved.
                </Typography>
            </div>
        </footer>
    );
};

export default Footer;
