function hidableCommentIdentifier(id: string): string {
    return `<!-- hidable-coment-action: ${id} -->`;
}

export function isHidableComment(body: string, id: string): boolean {
    return body.startsWith(hidableCommentIdentifier(id));
}

export function createHidableComment(body: string, id: string): string {
    return `${hidableCommentIdentifier(id)}  ${body}`;
}
