// Blog App JavaScript
class BlogApp {
	constructor() {
		this.blogs = this.loadBlogs();
		this.currentView = "list";
		this.editingId = null;
		this.quill = null;
		this.tinymce = null;
		this.currentEditorType = null;
		this.init();
	}

	init() {
		this.bindEvents();
		this.renderBlogList();
	}

	initQuillEditor() {
		if (this.quill) {
			this.quill = null;
		}

		const toolbarOptions = [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike"],
			[{ color: [] }, { background: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ indent: "-1" }, { indent: "+1" }],
			[{ align: [] }],
			["link", "image"],
			["blockquote", "code-block"],
			["clean"],
		];

		this.quill = new Quill("#blogContent", {
			theme: "snow",
			modules: {
				toolbar: toolbarOptions,
			},
			placeholder: "Write your blog content here...",
		});
	}

	initTinyMCEEditor() {
		// Remove existing editor first
		if (this.tinymce) {
			tinymce.remove();
			this.tinymce = null;
		}

		// Clear the content div
		const contentDiv = document.getElementById("blogContent");
		if (contentDiv) {
			contentDiv.innerHTML = "";
		}

		// Wait for TinyMCE to be available
		const initEditor = () => {
			if (typeof tinymce !== "undefined") {
				// Ensure the content div exists
				const contentDiv = document.getElementById("blogContent");
				if (!contentDiv) {
					console.error("Content div not found");
					return;
				}

				// Remove any existing TinyMCE instances
				tinymce.remove("#blogContent");

				tinymce.init({
					selector: "#blogContent",
					height: 500,
					menubar: true,
					menubar: "file edit view insert format tools table help",
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"help",
						"wordcount",
						"emoticons",
						"template",
						"paste",
						"textcolor",
						"nonbreaking",
						"pagebreak",
						"directionality",
						"visualchars",
						"noneditable",
						"save",
						"hr",
						"imagetools",
						"autosave",
						"codesample",
						"quickbars",
					],
					toolbar: [
						"undo redo | blocks fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save | insertfile image media template link anchor codesample | ltr rtl",
						"searchreplace visualblocks code | insertdatetime media table | hr nonbreaking | blocks fontfamily fontsize | numlist bullist indent outdent | pagebreak | charmap emoticons | fullscreen preview | help",
					],
					toolbar_mode: "sliding",
					contextmenu: "link image imagetools table",
					quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
					quickbars_insert_toolbar: "quickimage quicktable",
					quickbars_image_toolbar: "alignleft aligncenter alignright | rotateleft rotateright | imageoptions",
					content_style: `
						body { 
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
							font-size: 14px; 
							line-height: 1.6; 
							margin: 20px;
							padding: 20px;
							background: #f8f9fa;
						}
						h1, h2, h3, h4, h5, h6 {
							color: #2c3e50;
							margin-top: 1.5em;
							margin-bottom: 0.5em;
						}
						p {
							margin-bottom: 1em;
						}
						blockquote {
							border-left: 4px solid #3498db;
							padding-left: 20px;
							margin: 20px 0;
							font-style: italic;
							background: #f8f9fa;
							padding: 15px 20px;
						}
						code {
							background: #e9ecef;
							padding: 2px 6px;
							border-radius: 3px;
							font-family: 'Courier New', monospace;
						}
						pre {
							background: #2c3e50;
							color: #ecf0f1;
							padding: 15px;
							border-radius: 5px;
							overflow-x: auto;
						}
						pre code {
							background: transparent;
							color: inherit;
							padding: 0;
						}
						table {
							border-collapse: collapse;
							width: 100%;
							margin: 20px 0;
						}
						th, td {
							border: 1px solid #ddd;
							padding: 12px;
							text-align: left;
						}
						th {
							background-color: #f2f2f2;
							font-weight: bold;
						}
						img {
							max-width: 100%;
							height: auto;
							border-radius: 5px;
							box-shadow: 0 2px 8px rgba(0,0,0,0.1);
						}
					`,
					skin: "oxide",
					content_css: "default",

					// Image handling
					image_advtab: true,
					image_uploadtab: true,
					image_upload_handler: (blobInfo, success, failure, progress) => {
						// Convert blob to base64 for local storage
						const reader = new FileReader();
						reader.onload = () => {
							success(reader.result);
						};
						reader.onerror = () => {
							failure("Image upload failed");
						};
						reader.readAsDataURL(blobInfo.blob());
					},

					// File handling
					file_picker_types: "file image media",
					file_picker_callback: (callback, value, meta) => {
						if (meta.filetype === "image") {
							const input = document.createElement("input");
							input.setAttribute("type", "file");
							input.setAttribute("accept", "image/*");
							input.click();

							input.onchange = function () {
								const file = this.files[0];
								if (file) {
									const reader = new FileReader();
									reader.onload = function () {
										callback(reader.result, {
											alt: file.name,
										});
									};
									reader.readAsDataURL(file);
								}
							};
						}
					},

					// Enhanced features
					paste_data_images: true,
					automatic_uploads: true,
					images_upload_url: false, // We're handling uploads locally
					convert_urls: false,

					// Templates
					templates: [
						{
							title: "Blog Post Template",
							description: "A basic blog post template",
							content: "<h2>Blog Post Title</h2><p>Write your content here...</p><h3>Subheading</h3><p>More content...</p>",
						},
						{
							title: "Code Tutorial Template",
							description: "Template for coding tutorials",
							content:
								"<h2>Tutorial: How to...</h2><p>In this tutorial, we will learn how to...</p><h3>Step 1: Setup</h3><pre><code>// Your code here</code></pre><h3>Step 2: Implementation</h3><p>Now let's implement...</p>",
						},
					],

					// Spell checker
					browser_spellcheck: true,
					contextmenu: "link image imagetools table spellchecker configurepermanentpen",

					// Auto-save
					autosave_ask_before_unload: true,
					autosave_interval: "30s",
					autosave_prefix: "{path}{query}-{id}-",
					autosave_retention: "2m",
					autosave_restore_when_empty: false,

					// Setup
					setup: (editor) => {
						this.tinymce = editor;
						editor.on("init", () => {
							console.log("TinyMCE initialized with full features");
							// Load pending content if we have it (for edit mode)
							if (this.pendingContent) {
								editor.setContent(this.pendingContent);
							}
						});

						// Add custom button for code blocks
						editor.ui.registry.addButton("codeblock", {
							text: "Code Block",
							onAction: function () {
								editor.insertContent("<pre><code>Your code here</code></pre>");
							},
						});

						// Add custom button for horizontal rule
						editor.ui.registry.addButton("hr", {
							text: "HR",
							onAction: function () {
								editor.insertContent("<hr>");
							},
						});

						// Add AI-powered features button
						editor.ui.registry.addButton("aiassist", {
							text: "AI",
							icon: "ai",
							onAction: function () {
								editor.notificationManager.open({
									text: "AI features coming soon! This would include smart writing suggestions, grammar checking, and content generation.",
									type: "info",
									timeout: 3000,
								});
							},
						});

						// Add export button
						editor.ui.registry.addButton("export", {
							text: "Export",
							icon: "export",
							onAction: function () {
								const content = editor.getContent();
								const blob = new Blob([content], { type: "text/html" });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = "blog-post.html";
								a.click();
								URL.revokeObjectURL(url);
							},
						});
					},
				});
			} else {
				// Retry after a short delay if TinyMCE isn't loaded yet
				setTimeout(initEditor, 200);
			}
		};

		initEditor();
	}

	bindEvents() {
		// Navigation buttons
		document.getElementById("addBlogQuillBtn").addEventListener("click", () => this.showAddForm("quill"));
		document.getElementById("addBlogTinyMCEBtn").addEventListener("click", () => this.showAddForm("tinymce"));
		document.getElementById("cancelBtn").addEventListener("click", () => this.showBlogList());
		document.getElementById("backBtn").addEventListener("click", () => this.showBlogList());

		// Form submission
		document.getElementById("blogFormElement").addEventListener("submit", (e) => this.handleFormSubmit(e));

		// Search functionality
		document.getElementById("searchInput").addEventListener("input", (e) => this.handleSearch(e));

		// Modal events
		document.getElementById("modalCancel").addEventListener("click", () => this.hideModal());
		document.getElementById("modalConfirm").addEventListener("click", () => this.handleModalConfirm());

		// Blog detail actions
		document.getElementById("editBlogBtn").addEventListener("click", () => this.editCurrentBlog());
		document.getElementById("deleteBlogBtn").addEventListener("click", () => this.confirmDelete());
	}

	// Local Storage Functions
	loadBlogs() {
		const saved = localStorage.getItem("blogApp_blogs");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				console.error("Error loading blogs:", e);
				return this.getDefaultBlogs();
			}
		}
		return this.getDefaultBlogs();
	}

	saveBlogs() {
		try {
			localStorage.setItem("blogApp_blogs", JSON.stringify(this.blogs));
		} catch (e) {
			console.error("Error saving blogs:", e);
			alert("Error saving blogs. Please try again.");
		}
	}

	getDefaultBlogs() {
		return [
			{
				id: 1,
				title: "Welcome to My Blog",
				author: "John Doe",
				content:
					"<p>This is my first blog post! I'm excited to share my thoughts and experiences with you. In this blog, I'll be covering topics related to <strong>web development</strong>, <em>technology trends</em>, and personal insights.</p><p>I hope you find the content valuable and engaging. Feel free to leave comments and share your thoughts!</p>",
				tags: ["welcome", "introduction", "blogging"],
				editorType: "quill",
				date: new Date().toISOString(),
			},
			{
				id: 2,
				title: "Getting Started with Vanilla JavaScript",
				author: "Jane Smith",
				content:
					"<p><strong>Vanilla JavaScript</strong> is powerful and doesn't require any frameworks or libraries. It's perfect for building interactive web applications.</p><p>In this post, we'll explore:</p><ul><li>DOM manipulation</li><li>Event handling</li><li>Local storage</li><li>Modern ES6+ features</li></ul><p>Let's dive into the world of pure JavaScript!</p>",
				tags: ["javascript", "web development", "tutorial"],
				editorType: "quill",
				date: new Date(Date.now() - 86400000).toISOString(),
			},
			{
				id: 3,
				title: "CSS Grid vs Flexbox: When to Use What",
				author: "Mike Johnson",
				content:
					"<p>Both <strong>CSS Grid</strong> and <strong>Flexbox</strong> are powerful layout tools, but they serve different purposes.</p><p><strong>CSS Grid</strong> is perfect for:</p><ul><li>Two-dimensional layouts</li><li>Complex page structures</li><li>Precise positioning</li></ul><p><strong>Flexbox</strong> excels at:</p><ul><li>One-dimensional layouts</li><li>Component alignment</li><li>Responsive design</li></ul><p>Choose the right tool for your specific use case!</p>",
				tags: ["css", "grid", "flexbox", "layout"],
				editorType: "quill",
				date: new Date(Date.now() - 172800000).toISOString(),
			},
		];
	}

	// View Management
	showView(viewName) {
		const views = ["blogList", "blogForm", "blogDetail"];
		views.forEach((view) => {
			document.getElementById(view).style.display = view === viewName ? "block" : "none";
		});
		this.currentView = viewName.replace("blog", "").toLowerCase();
	}

	showBlogList() {
		this.showView("blogList");
		this.renderBlogList();
		this.clearSearch();

		// Clean up editors when going back to list
		if (this.quill) {
			this.quill = null;
		}
		if (this.tinymce) {
			tinymce.remove();
			this.tinymce = null;
		}
	}

	showAddForm(editorType = "quill") {
		this.editingId = null;
		this.currentEditorType = editorType;
		this.showView("blogForm");
		this.resetForm();

		const editorName = editorType === "quill" ? "Quill" : "TinyMCE";
		document.getElementById("formTitle").textContent = `Add New Blog with ${editorName}`;
		document.getElementById("saveBtn").textContent = "Save Blog";

		// Initialize editor after a short delay to ensure DOM is ready
		setTimeout(() => {
			if (editorType === "quill") {
				this.initQuillEditor();
			} else if (editorType === "tinymce") {
				this.initTinyMCEEditor();
			}
		}, 200);
	}

	showBlogDetail(blogId) {
		const blog = this.blogs.find((b) => b.id === blogId);
		if (!blog) return;

		this.showView("blogDetail");
		this.renderBlogDetail(blog);
	}

	// Blog Rendering
	renderBlogList() {
		const container = document.getElementById("blogsContainer");

		if (this.blogs.length === 0) {
			container.innerHTML = `
                <div class="empty-state">
                    <h3>No blogs yet</h3>
                    <p>Start by adding your first blog post!</p>
                    <button class="btn btn-primary" onclick="blogApp.showAddForm()">Add First Blog</button>
                </div>
            `;
			return;
		}

		container.innerHTML = this.blogs.map((blog) => this.createBlogCard(blog)).join("");

		// Add click event listeners to blog cards
		container.querySelectorAll(".blog-card").forEach((card, index) => {
			card.addEventListener("click", () => {
				this.showBlogDetail(this.blogs[index].id);
			});
		});
	}

	createBlogCard(blog) {
		const tags = blog.tags.map((tag) => `<span class="tag">${this.escapeHtml(tag)}</span>`).join("");
		const date = new Date(blog.date).toLocaleDateString();
		const editorType = blog.editorType || "quill";
		const editorIndicator = `<span class="editor-type-indicator editor-type-${editorType}">${editorType.toUpperCase()}</span>`;

		// Strip HTML tags for preview and limit length
		const textContent = this.stripHtmlTags(blog.content);
		const content = this.escapeHtml(textContent.substring(0, 150)) + (textContent.length > 150 ? "..." : "");

		return `
            <div class="blog-card">
                <h3 class="blog-card-title">${this.escapeHtml(blog.title)}${editorIndicator}</h3>
                <div class="blog-card-author">By ${this.escapeHtml(blog.author)}</div>
                <div class="blog-card-date">${date}</div>
                <div class="blog-card-content">${content}</div>
                <div class="blog-card-tags">${tags}</div>
            </div>
        `;
	}

	renderBlogDetail(blog) {
		document.getElementById("detailTitle").textContent = blog.title;
		document.getElementById("detailAuthor").textContent = `By ${blog.author}`;
		document.getElementById("detailDate").textContent = new Date(blog.date).toLocaleDateString();

		// Display HTML content directly (from Quill editor)
		document.getElementById("detailContent").innerHTML = blog.content || "";

		const tagsContainer = document.getElementById("detailTags");
		tagsContainer.innerHTML = blog.tags.map((tag) => `<span class="tag">${this.escapeHtml(tag)}</span>`).join("");

		// Store current blog ID for editing
		this.currentBlogId = blog.id;
	}

	formatContent(content) {
		return content.replace(/\n/g, "<br>");
	}

	// Form Handling
	resetForm() {
		document.getElementById("blogFormElement").reset();
		this.clearFormErrors();

		// Clean up editors
		if (this.quill) {
			this.quill = null;
		}
		if (this.tinymce) {
			tinymce.remove();
			this.tinymce = null;
		}

		// Clear the content div and reset pending content
		const contentDiv = document.getElementById("blogContent");
		if (contentDiv) {
			contentDiv.innerHTML = "";
		}
		this.pendingContent = null;
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.clearFormErrors();

		// Get form data
		const title = document.getElementById("blogTitle").value.trim();
		const author = document.getElementById("blogAuthor").value.trim();
		const tags = document
			.getElementById("blogTags")
			.value.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag);

		// Get content from current editor
		let content = "";
		if (this.currentEditorType === "quill" && this.quill) {
			content = this.quill.root.innerHTML;
		} else if (this.currentEditorType === "tinymce" && this.tinymce) {
			content = this.tinymce.getContent();
		}

		const blogData = {
			title,
			author,
			content,
			tags,
			editorType: this.currentEditorType,
			date: new Date().toISOString(),
		};

		if (this.validateForm(blogData)) {
			if (this.editingId) {
				this.updateBlog(this.editingId, blogData);
			} else {
				this.addBlog(blogData);
			}
			this.showBlogList();
		}
	}

	validateForm(data) {
		let isValid = true;

		if (!data.title) {
			this.showFieldError("blogTitle", "Title is required");
			isValid = false;
		}

		if (!data.author) {
			this.showFieldError("blogAuthor", "Author is required");
			isValid = false;
		}

		if (!data.content) {
			this.showFieldError("blogContent", "Content is required");
			isValid = false;
		}

		return isValid;
	}

	showFieldError(fieldId, message) {
		const field = document.getElementById(fieldId);
		field.style.borderColor = "#f56565";

		let errorElement = field.parentNode.querySelector(".error-message");
		if (!errorElement) {
			errorElement = document.createElement("div");
			errorElement.className = "error-message";
			errorElement.style.color = "#f56565";
			errorElement.style.fontSize = "12px";
			errorElement.style.marginTop = "5px";
			field.parentNode.appendChild(errorElement);
		}
		errorElement.textContent = message;
	}

	clearFormErrors() {
		document.querySelectorAll(".error-message").forEach((error) => error.remove());
		document.querySelectorAll(".form-input, .form-textarea").forEach((field) => {
			field.style.borderColor = "#e2e8f0";
		});
	}

	editCurrentBlog() {
		if (!this.currentBlogId) return;

		const blog = this.blogs.find((b) => b.id === this.currentBlogId);
		if (!blog) return;

		this.editingId = this.currentBlogId;
		this.currentEditorType = blog.editorType || "quill";
		this.showView("blogForm");

		const editorName = this.currentEditorType === "quill" ? "Quill" : "TinyMCE";
		document.getElementById("formTitle").textContent = `Edit Blog (${editorName})`;
		document.getElementById("saveBtn").textContent = "Update Blog";

		document.getElementById("blogTitle").value = blog.title;
		document.getElementById("blogAuthor").value = blog.author;
		document.getElementById("blogTags").value = blog.tags.join(", ");

		// Initialize appropriate editor and set content
		setTimeout(() => {
			if (this.currentEditorType === "quill") {
				this.initQuillEditor();
				// Set content in Quill editor
				if (this.quill && blog.content) {
					this.quill.root.innerHTML = blog.content;
				}
			} else if (this.currentEditorType === "tinymce") {
				this.initTinyMCEEditor();
				// Store the blog content to be loaded after TinyMCE initializes
				this.pendingContent = blog.content;
			}
		}, 100);
	}

	// Blog CRUD Operations
	addBlog(blogData) {
		const newBlog = {
			id: Date.now(),
			...blogData,
		};
		this.blogs.unshift(newBlog);
		this.saveBlogs();
		this.showNotification("Blog added successfully!", "success");
	}

	updateBlog(id, blogData) {
		const index = this.blogs.findIndex((blog) => blog.id === id);
		if (index !== -1) {
			this.blogs[index] = { ...this.blogs[index], ...blogData };
			this.saveBlogs();
			this.showNotification("Blog updated successfully!", "success");
		}
	}

	deleteBlog(id) {
		this.blogs = this.blogs.filter((blog) => blog.id !== id);
		this.saveBlogs();
		this.showNotification("Blog deleted successfully!", "success");
		this.showBlogList();
	}

	confirmDelete() {
		if (!this.currentBlogId) return;

		const blog = this.blogs.find((b) => b.id === this.currentBlogId);
		if (!blog) return;

		this.showModal("Delete Blog", `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`, () => this.deleteBlog(this.currentBlogId));
	}

	// Search Functionality
	handleSearch(e) {
		const query = e.target.value.toLowerCase();
		const container = document.getElementById("blogsContainer");

		if (!query.trim()) {
			this.renderBlogList();
			return;
		}

		const filteredBlogs = this.blogs.filter(
			(blog) =>
				blog.title.toLowerCase().includes(query) ||
				blog.author.toLowerCase().includes(query) ||
				blog.content.toLowerCase().includes(query) ||
				blog.tags.some((tag) => tag.toLowerCase().includes(query))
		);

		if (filteredBlogs.length === 0) {
			container.innerHTML = `
                <div class="empty-state">
                    <h3>No blogs found</h3>
                    <p>Try adjusting your search terms.</p>
                </div>
            `;
		} else {
			container.innerHTML = filteredBlogs.map((blog) => this.createBlogCard(blog)).join("");

			// Add click event listeners to filtered blog cards
			container.querySelectorAll(".blog-card").forEach((card, index) => {
				card.addEventListener("click", () => {
					this.showBlogDetail(filteredBlogs[index].id);
				});
			});
		}
	}

	clearSearch() {
		document.getElementById("searchInput").value = "";
	}

	// Modal Functions
	showModal(title, message, onConfirm) {
		document.getElementById("modalMessage").textContent = message;
		document.getElementById("confirmModal").style.display = "flex";
		this.modalConfirmCallback = onConfirm;
	}

	hideModal() {
		document.getElementById("confirmModal").style.display = "none";
		this.modalConfirmCallback = null;
	}

	handleModalConfirm() {
		if (this.modalConfirmCallback) {
			this.modalConfirmCallback();
		}
		this.hideModal();
	}

	// Utility Functions
	escapeHtml(text) {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	stripHtmlTags(html) {
		const div = document.createElement("div");
		div.innerHTML = html;
		return div.textContent || div.innerText || "";
	}

	showNotification(message, type = "info") {
		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.textContent = message;

		// Style the notification
		Object.assign(notification.style, {
			position: "fixed",
			top: "20px",
			right: "20px",
			padding: "15px 20px",
			borderRadius: "8px",
			color: "white",
			fontWeight: "600",
			zIndex: "10000",
			opacity: "0",
			transform: "translateX(100%)",
			transition: "all 0.3s ease",
		});

		// Set background color based on type
		switch (type) {
			case "success":
				notification.style.background = "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";
				break;
			case "error":
				notification.style.background = "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)";
				break;
			default:
				notification.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
		}

		document.body.appendChild(notification);

		// Animate in
		setTimeout(() => {
			notification.style.opacity = "1";
			notification.style.transform = "translateX(0)";
		}, 100);

		// Auto remove after 3 seconds
		setTimeout(() => {
			notification.style.opacity = "0";
			notification.style.transform = "translateX(100%)";
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification);
				}
			}, 300);
		}, 3000);
	}
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	window.blogApp = new BlogApp();
});

// Handle browser back/forward buttons
window.addEventListener("popstate", (e) => {
	if (window.blogApp) {
		window.blogApp.showBlogList();
	}
});
