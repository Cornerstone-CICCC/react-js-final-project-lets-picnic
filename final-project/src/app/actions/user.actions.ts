export type NewUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

export async function getUsers() {
    const res = await fetch("http://localhost:3000/user")
    const data = await res.json()
    return data
}

export async function getUserById(userId: number) {
    try {
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        return data
    } catch (error) {
        console.error("getUserById error:", error);
        throw error;
    }
}


export async function newUser(user: NewUser) {
    const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Signup failed:", errorData);
        throw new Error("Failed to create user");
    }

    const data = await res.json();
    return data;
}


export async function logInUser(email: string, password: string) {
    const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();
    return data;
}

export async function logOutUser() {
    const res = await fetch("http://localhost:3000/user/logout", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    const data = await res.json();
    return data;
}

export async function checkCookie() {
    const res = await fetch("http://localhost:3000/user/check-cookie", {
        credentials: "include",
    });
    const data = await res.json();
    return data;
}

