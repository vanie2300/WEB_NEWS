const API = {
async get(path) {
try {
const res = await fetch(path);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return await res.json();
} catch (err) {
console.error(`[API] ${path} failed:`, err.message);
return null;
}
},
home() { return this.get('/api/home'); },
category(name) { return this.get(`/api/category/${encodeURIComponent(name)}`); },
search(q) { return this.get(`/api/search?q=${encodeURIComponent(q)}`); },
article(url) { return this.get(`/api/article?url=${encodeURIComponent(url)}`); }
};
