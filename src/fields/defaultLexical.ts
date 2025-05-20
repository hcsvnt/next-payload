import {
    FixedToolbarFeature,
    HeadingFeature,
    HTMLConverterFeature,
    InlineToolbarFeature,
    lexicalEditor,
    LinkFeature
} from '@payloadcms/richtext-lexical';

/**
 * Default lexical editor configuration
 * docs: https://payloadcms.com/docs/rich-text/overview
 */

export const defaultLexical = lexicalEditor({
    features: ({ rootFeatures }) => {
        return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HTMLConverterFeature({}),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            LinkFeature({
                enabledCollections: ['pages']
            })
        ];
    }
});
