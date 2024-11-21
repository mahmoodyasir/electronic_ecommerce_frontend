import { TextField, Button } from "@mui/material";

const NewsletterSignup = () => {
    return (
        <section className="py-12 bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4">
                    Stay Updated with Our Latest News
                </h2>
                <p className="text-lg font-medium mb-8">
                    Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and updates.
                </p>
                <form className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <TextField
                        variant="outlined"
                        placeholder="Enter your email address"
                        type="email"
                        required
                        sx={{
                            bgcolor: "white",
                            borderRadius: "9999px",
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "9999px",
                                "& fieldset": {
                                    borderColor: "transparent", // Removes the outer border
                                },
                                "&:hover fieldset": {
                                    borderColor: "transparent", // Prevents hover outline
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "transparent", // Removes focus outline
                                },
                            },
                            "& input": {
                                padding: "10px 20px",
                                color: "gray",
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSignup;
