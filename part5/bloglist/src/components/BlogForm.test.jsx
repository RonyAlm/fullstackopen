import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
    test("renders form", () => {
        render(<BlogForm createBlog={() => {}} />);
        const form = screen.findByLabelText("Form to add a new blog");
        expect(form).toBeDefined();
    });

    test("calls the event handler with correct details when a new blog is created", async () => {
        const createBlog = vi.fn();
        const user = userEvent.setup();

        render(<BlogForm createBlog={createBlog} />);

        const inputTitle = screen.getByPlaceholderText("title");
        const inputAuthor = screen.getByPlaceholderText("author");
        const inputUrl = screen.getByPlaceholderText("url");
        const button = screen.getByText("create");

        await user.type(inputTitle, "test title");
        await user.type(inputAuthor, "test author");
        await user.type(inputUrl, "test url");

        await user.click(button);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe("test title");
    });

});