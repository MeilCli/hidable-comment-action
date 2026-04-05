import { isHidableComment, createHidableComment } from "../src/comment";
import { test, expect } from "@jest/globals";

test("isHidableComment", () => {
    const body1 = "test-body1";
    const id1 = "id1";
    const hidableCommentBody = createHidableComment(body1, id1);
    expect(isHidableComment(hidableCommentBody, id1)).toBe(true);
});
