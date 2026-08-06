import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 font-display text-2xl normal-case tracking-normal md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-6 font-display text-xl normal-case tracking-normal" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-ink/80" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/80" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink/80" {...props} />
  ),
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  a: (props) => (
    <a className="font-semibold text-orange hover:underline" {...props} />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-tape">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface" {...props} />,
  th: (props) => (
    <th className="p-3 font-semibold text-ink" {...props} />
  ),
  td: (props) => <td className="border-t border-tape p-3 text-ink/80" {...props} />,
};
