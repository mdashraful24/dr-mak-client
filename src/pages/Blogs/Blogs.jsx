const Blogs = () => {
    const featuredPost = {
        title: "Advancements in Minimally Invasive Brain Surgery",
        excerpt: "Exploring the latest techniques in endoscopic neurosurgery that reduce recovery time and improve patient outcomes through smaller incisions and enhanced precision.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Surgical Techniques",
        date: "Nov 15, 2023",
        readTime: "8 min read",
        author: {
            name: "Dr. Sarah Chen",
            role: "Lead Neurosurgeon"
        }
    };

    const blogPosts = [
        {
            title: "Understanding Brain Tumor Types and Treatment Options",
            excerpt: "A comprehensive guide to different brain tumor classifications, symptoms, and modern treatment approaches including targeted therapies.",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Brain Health",
            date: "Nov 10, 2023",
            readTime: "6 min read"
        },
        {
            title: "Spinal Cord Injury Recovery: What to Expect",
            excerpt: "Navigating the rehabilitation journey after spinal cord surgery - from immediate post-op care to long-term recovery strategies.",
            image: "https://images.unsplash.com/photo-1516549655669-df6654e35d31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Recovery",
            date: "Nov 5, 2023",
            readTime: "10 min read"
        },
        {
            title: "Pediatric Neurosurgery: Special Considerations",
            excerpt: "Addressing the unique challenges and approaches in treating neurological conditions in children and adolescents.",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Pediatrics",
            date: "Oct 28, 2023",
            readTime: "7 min read"
        },
        {
            title: "The Future of Deep Brain Stimulation",
            excerpt: "How emerging technologies are revolutionizing the treatment of Parkinson's disease and other movement disorders.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Innovation",
            date: "Oct 22, 2023",
            readTime: "9 min read"
        },
        {
            title: "Managing Chronic Pain Through Neurosurgical Interventions",
            excerpt: "Exploring surgical options for patients with chronic pain conditions that haven't responded to conventional treatments.",
            image: "https://images.unsplash.com/photo-1542736667-069246bdbc6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Pain Management",
            date: "Oct 15, 2023",
            readTime: "5 min read"
        },
        {
            title: "Concussion and Traumatic Brain Injury: Latest Research",
            excerpt: "Recent findings in TBI research and how they're shaping modern diagnostic and treatment protocols.",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Research",
            date: "Oct 8, 2023",
            readTime: "11 min read"
        }
    ];

    const categories = [
        "All Topics",
        "Surgical Techniques",
        "Brain Health",
        "Recovery",
        "Pediatrics",
        "Innovation",
        "Research",
        "Patient Stories"
    ];

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Professional Insights</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Neurosurgical <span className="text-blue-600">Blog</span>
                    </h1>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Expert perspectives on neurological conditions, surgical innovations, patient care,
                        and the latest advancements in neurosurgery.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-5 mb-12">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-2xl transition-all duration-300 ${index === 0
                                ? "bg-blue-600 text-white font-medium shadow-neumorphic-soft"
                                : "bg-neumorphic shadow-neumorphic-soft hover:shadow-neumorphic-inset"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
                    <div className="bg-white rounded-3xl shadow-neumorphic-soft overflow-hidden hover:shadow-neumorphic-softInset transition-all duration-500 border border-gray-200">
                        <div className="md:flex">
                            <div className="md:w-2/5">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {featuredPost.category}
                                    </span>
                                    <span className="text-gray-600 text-sm">{featuredPost.date}</span>
                                    <span className="text-gray-600 text-sm">{featuredPost.readTime}</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    {featuredPost.title}
                                </h3>

                                <p className="text-gray-700 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            SC
                                        </div>
                                        <div>
                                            <p className="font-semibold">{featuredPost.author.name}</p>
                                            <p className="text-sm text-gray-600">{featuredPost.author.role}</p>
                                        </div>
                                    </div>

                                    <button className="px-6 py-3 rounded-2xl bg-neumorphic shadow-neumorphic-soft hover:shadow-neumorphic-inset text-blue-600 font-semibold transition-all duration-300">
                                        Read Article
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div>
                    <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl shadow-neumorphic-soft hover:shadow-neumorphic-softInset transition-all duration-500 transform hover:-translate-y-0.5 overflow-hidden flex flex-col h-full border border-gray-200"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                            {post.category}
                                        </span>
                                        <span className="text-gray-600 text-sm">{post.date}</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-700 mb-6 leading-relaxed grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4">
                                        <span className="text-gray-600 text-sm">{post.readTime}</span>
                                        <button className="px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft hover:shadow-neumorphic-inset text-blue-600 text-sm font-medium transition-all duration-300 whitespace-nowrap">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="px-8 py-4 rounded-2xl bg-neumorphic shadow-neumorphic-soft hover:shadow-neumorphic-inset text-blue-600 font-semibold text-lg transition-all duration-300">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
