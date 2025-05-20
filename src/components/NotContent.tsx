/**
 * A function to say whether we're getting the actual content or just an id from Payload API.
 * It may not do much, but it's a good way to keep the code DRY and consistent.
 * @param content - the content to check
 * @returns whether the content is an id or not
 */
export const isIdNotContent = (content: unknown) => typeof content === 'string';

/**
 * A component to display a message when CMS content is not available.
 * In Payload CMS this can be due to one of the following reasons:
 * - the queried document no longer exists
 * - the query depth is too deep
 * - the user does not have the necessary permissions
 *
 * The component uses the {@link isIdNotContent} function to check the type.
 *
 * @param id - the id of the content that is not available
 * @param comment - an optional comment to display in the message
 * @returns a message to display when content is not available
 *
 */
const NotContent = ({ id, comment }: { id: string; comment?: string }) => (
    <div style={{ padding: 'var(--padding);' }}>
        Can't access {id}, {comment ? `(comment: ${comment})` : ''} please check:
        <ul>
            <li>if queried document still exists</li>
            <li>query depth</li>
            <li>permissions</li>
        </ul>
    </div>
);

export default NotContent;
