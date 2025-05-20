import type {
    DefaultNodeTypes,
    // SerializedBlockNode,
    SerializedLinkNode
} from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

// import Intro from '@/blocks/Intro/Intro';
import {
    LinkJSXConverter,
    RichText as RichTextWithoutBlocks
} from '@payloadcms/richtext-lexical/react';

// import type { IntroBlock as IntroBlockType } from '@/payload.types';

// type NodeTypes = DefaultNodeTypes | SerializedBlockNode<IntroBlockType>;
type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!;
    if (typeof value !== 'object') {
        throw new Error('Expected value to be an object');
    }
    const slug = value.slug;
    return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref })
    // blocks: { intro: ({ node }) => <Intro {...node.fields} /> } // guess
    // you'd only want this here if allowing blocks from the lexical editor level
});

type Props = {
    data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
    return <RichTextWithoutBlocks converters={jsxConverters} {...props} />;
}
