import {
    BoldFeature,
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    ItalicFeature,
    lexicalEditor,
    OrderedListFeature,
    ParagraphFeature,
    SubscriptFeature,
    SuperscriptFeature,
    UnderlineFeature,
    UnorderedListFeature
    // LinkFeature,
    // TreeViewFeature,
} from '@payloadcms/richtext-lexical';

/**
 * Default lexical editor configuration
 * docs: https://payloadcms.com/docs/rich-text/overview
 */
export const defaultLexical = lexicalEditor({
    features: () => {
        return [
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            ParagraphFeature(),
            UnorderedListFeature(),
            OrderedListFeature()
            // LinkFeature({ enabledCollections: ['pages', 'news'] }),
            // TreeViewFeature()
        ];
    }
});
