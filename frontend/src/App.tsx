import { useEffect, useState } from "react";

interface Story {
    id: number;
    title: string;
    description: string;
}

function App() {
    const [stories, setStories] = useState<Story[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("/api/stories")
            .then(res => res.json())
            .then(setStories)
            .catch(console.error);
    }, []);

    const submit = async () => {
        if (!title.trim() || !description.trim()) return;

        const res = await fetch("/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });

        if (res.ok) {
            const newStory = await res.json();
            setStories(prev => [...prev, newStory]);
            setTitle("");
            setDescription("");
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Adventure Creator</h1>

            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Story Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                />
                <textarea
                    placeholder="Story Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", height: "6rem" }}
                />
                <br/>
                <button onClick={submit} style={{ marginTop: "0.5rem" }}>
                    Add Story
                </button>
            </div>

            <ul>
                {stories.map(story => (
                    <li key={story.id} style={{ marginBottom: "1rem" }}>
                        <strong>{story.title}</strong>
                        <p>{story.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
