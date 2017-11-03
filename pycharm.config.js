
// Allows PyCharm to resolve modules imported with our custom aliases. This uses the SystemJS
// config format. We don't actually use SystemJS, but PyCharm understands it anyway. I am unaware of
// any direct plugin for module-alias (the Babel plugin we use to support aliasing), and this is the
// best hack I could come up with
System.config({
    paths: {
        mdc: './src/lib/mdc'
    }
});
