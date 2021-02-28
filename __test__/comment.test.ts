import { isHidableComment, createHidableComment } from "../src/comment";

test("isHidableComment", () => {
    const body1 = "test-body1";
    const id1 = "id1";
    const hidableCommentBody = createHidableComment(body1, id1);
    expect(isHidableComment(hidableCommentBody, id1)).toBe(true);
});
