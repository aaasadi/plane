import {
  ALargeSmall,
  CaseSensitive,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  List,
  ListOrdered,
  ListTodo,
  MessageSquareText,
  MinusSquare,
  Smile,
  Table,
  TextQuote,
} from "lucide-react";
// constants
import { COLORS_LIST } from "@/constants/common";
// helpers
import {
  insertTableCommand,
  toggleBlockquote,
  toggleBulletList,
  toggleOrderedList,
  toggleTaskList,
  toggleHeading,
  toggleTextColor,
  toggleBackgroundColor,
  insertImage,
  insertCallout,
  setText,
  openEmojiPicker,
} from "@/helpers/editor-commands";
// plane editor extensions
import { coreEditorAdditionalSlashCommandOptions } from "@/plane-editor/extensions";
// types
import { CommandProps, ISlashCommandItem, TSlashCommandSectionKeys } from "@/types";
// local types
import { TExtensionProps, TSlashCommandAdditionalOption } from "./root";

export type TSlashCommandSection = {
  key: TSlashCommandSectionKeys;
  title?: string;
  items: ISlashCommandItem[];
};

export const getSlashCommandFilteredSections =
  (args: TExtensionProps) =>
  ({ query }: { query: string }): TSlashCommandSection[] => {
    const { additionalOptions: externalAdditionalOptions, disabledExtensions, flaggedExtensions } = args;
    const SLASH_COMMAND_SECTIONS: TSlashCommandSection[] = [
      {
        key: "general",
        items: [
          {
            commandKey: "text",
            key: "text",
            title: "editor.text",
            description: "Just start typing with plain text.",
            searchTerms: ["p", "paragraph", "متن"],
            icon: <CaseSensitive className="size-3.5" />,
            command: ({ editor, range }) => setText(editor, range),
          },
          {
            commandKey: "h1",
            key: "h1",
            title: "editor.heading_1",
            description: "Big section heading.",
            searchTerms: ["title", "big", "large", "عنوان", "تیتر", "بزرگ", "درشت"],
            icon: <Heading1 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 1, range),
          },
          {
            commandKey: "h2",
            key: "h2",
            title: "editor.heading_2",
            description: "Medium section heading.",
            searchTerms: ["subtitle", "medium", "عنوان", "متوسط", "موضوع"],
            icon: <Heading2 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 2, range),
          },
          {
            commandKey: "h3",
            key: "h3",
            title: "editor.heading_3",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small", "عنوان", "کوچک", "موضوع"],
            icon: <Heading3 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 3, range),
          },
          {
            commandKey: "h4",
            key: "h4",
            title: "editor.heading_4",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small", "عنوان", "کوچک"],
            icon: <Heading4 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 4, range),
          },
          {
            commandKey: "h5",
            key: "h5",
            title: "editor.heading_5",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small", "عنوان", "کوچک"],
            icon: <Heading5 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 5, range),
          },
          {
            commandKey: "h6",
            key: "h6",
            title: "editor.heading_6",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small", "عنوان", "کوچک"],
            icon: <Heading6 className="size-3.5" />,
            command: ({ editor, range }) => toggleHeading(editor, 6, range),
          },
          {
            commandKey: "to-do-list",
            key: "to-do-list",
            title: "editor.todo",
            description: "Track tasks with a to-do list.",
            searchTerms: ["todo", "task", "list", "check", "checkbox", "لیست", "کارها", "گام‌ها", "قدم‌ها", "فهرست"],
            icon: <ListTodo className="size-3.5" />,
            command: ({ editor, range }) => toggleTaskList(editor, range),
          },
          {
            commandKey: "bulleted-list",
            key: "bulleted-list",
            title: "editor.bullet_list",
            description: "Create a simple bullet list.",
            searchTerms: ["unordered", "point", "فهرست", "لیست", "نکات"],
            icon: <List className="size-3.5" />,
            command: ({ editor, range }) => toggleBulletList(editor, range),
          },
          {
            commandKey: "numbered-list",
            key: "numbered-list",
            title: "editor.numbered_list",
            description: "Create a list with numbering.",
            searchTerms: ["ordered", "فهرست", "لیست", "نکات"],
            icon: <ListOrdered className="size-3.5" />,
            command: ({ editor, range }) => toggleOrderedList(editor, range),
          },
          {
            commandKey: "table",
            key: "table",
            title: "editor.table",
            description: "Create a table",
            searchTerms: ["table", "cell", "db", "data", "tabular", "جدول", "داده", "سلول", "اطلاعات"],
            icon: <Table className="size-3.5" />,
            command: ({ editor, range }) => insertTableCommand(editor, range),
          },
          {
            commandKey: "quote",
            key: "quote",
            title: "editor.quote",
            description: "Capture a quote.",
            searchTerms: ["blockquote", "نقل‌قول", "نقل قول", "نظر", "دیدگاه", "رای"],
            icon: <TextQuote className="size-3.5" />,
            command: ({ editor, range }) => toggleBlockquote(editor, range),
          },
          {
            commandKey: "code",
            key: "code",
            title: "editor.code",
            description: "Capture a code snippet.",
            searchTerms: ["codeblock", "کد", "برنامه", "دستور"],
            icon: <Code2 className="size-3.5" />,
            command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
          },
          {
            commandKey: "callout",
            key: "callout",
            title: "editor.callout",
            icon: <MessageSquareText className="size-3.5" />,
            description: "Insert callout",
            searchTerms: ["callout", "comment", "message", "info", "alert", "دیدگاه", "نظر", "یادداشت", "پیام", "پیشنهاد", "هشدار", "ایده"],
            command: ({ editor, range }: CommandProps) => insertCallout(editor, range),
          },
          {
            commandKey: "divider",
            key: "divider",
            title: "editor.divider",
            description: "Visually divide blocks.",
            searchTerms: ["line", "divider", "horizontal", "rule", "separate", "جداکننده", "خط"],
            icon: <MinusSquare className="size-3.5" />,
            command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
          },
          {
            commandKey: "emoji",
            key: "emoji",
            title: "editor.emoji",
            description: "Insert an emoji",
            searchTerms: ["emoji", "icons", "reaction", "emoticon", "emotags", "ایموجی", "شکلک", "آیکون", "ایکون"],
            icon: <Smile className="size-3.5" />,
            command: ({ editor, range }) => {
              openEmojiPicker(editor, range);
            },
          },
        ],
      },
      {
        key: "text-colors",
        title: "editor.colors",
        items: [
          {
            commandKey: "text-color",
            key: "text-color-default",
            title: "editor.default",
            description: "Change text color",
            searchTerms: ["color", "text", "default"],
            icon: (
              <ALargeSmall
                className="size-3.5"
                style={{
                  color: "rgba(var(--color-text-100))",
                }}
              />
            ),
            command: ({ editor, range }) => toggleTextColor(undefined, editor, range),
          },
          ...COLORS_LIST.map(
            (color) =>
              ({
                commandKey: "text-color",
                key: `text-color-${color.key}`,
                title: color.label,
                description: "Change text color",
                searchTerms: ["color", "text", color.label],
                icon: (
                  <ALargeSmall
                    className="size-3.5"
                    style={{
                      color: color.textColor,
                    }}
                  />
                ),
                command: ({ editor, range }) => toggleTextColor(color.key, editor, range),
              }) as ISlashCommandItem
          ),
        ],
      },
      {
        key: "background-colors",
        title: "editor.background_colors",
        items: [
          {
            commandKey: "background-color",
            key: "background-color-default",
            title: "editor.default_background",
            description: "Change background color",
            searchTerms: ["color", "bg", "background", "default"],
            icon: <ALargeSmall className="size-3.5" />,
            iconContainerStyle: {
              borderRadius: "4px",
              backgroundColor: "rgba(var(--color-background-100))",
              border: "1px solid rgba(var(--color-border-300))",
            },
            command: ({ editor, range }) => toggleTextColor(undefined, editor, range),
          },
          ...COLORS_LIST.map(
            (color) =>
              ({
                commandKey: "background-color",
                key: `background-color-${color.key}`,
                title: color.label,
                description: "Change background color",
                searchTerms: ["color", "bg", "background", color.label],
                icon: <ALargeSmall className="size-3.5" />,
                iconContainerStyle: {
                  borderRadius: "4px",
                  backgroundColor: color.backgroundColor,
                },
                command: ({ editor, range }) => toggleBackgroundColor(color.key, editor, range),
              }) as ISlashCommandItem
          ),
        ],
      },
    ];

    const internalAdditionalOptions: TSlashCommandAdditionalOption[] = [];
    if (!disabledExtensions?.includes("image")) {
      internalAdditionalOptions.push({
        commandKey: "image",
        key: "image",
        title: "editor.image",
        icon: <ImageIcon className="size-3.5" />,
        description: "Insert an image",
        searchTerms: ["img", "photo", "picture", "media", "upload"],
        command: ({ editor, range }: CommandProps) => insertImage({ editor, event: "insert", range }),
        section: "general",
        pushAfter: "code",
      });
    }

    [
      ...internalAdditionalOptions,
      ...(externalAdditionalOptions ?? []),
      ...coreEditorAdditionalSlashCommandOptions({
        disabledExtensions,
        flaggedExtensions,
      }),
    ]?.forEach((item) => {
      const sectionToPushTo = SLASH_COMMAND_SECTIONS.find((s) => s.key === item.section) ?? SLASH_COMMAND_SECTIONS[0];
      const itemIndexToPushAfter = sectionToPushTo.items.findIndex((i) => i.commandKey === item.pushAfter);
      if (itemIndexToPushAfter !== -1) {
        sectionToPushTo.items.splice(itemIndexToPushAfter + 1, 0, item);
      } else {
        sectionToPushTo.items.push(item);
      }
    });

    const filteredSlashSections = SLASH_COMMAND_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (typeof query !== "string") return;

        const lowercaseQuery = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.description.toLowerCase().includes(lowercaseQuery) ||
          item.searchTerms.some((t) => t.includes(lowercaseQuery))
        );
      }),
    }));

    return filteredSlashSections.filter((s) => s.items.length !== 0);
  };
