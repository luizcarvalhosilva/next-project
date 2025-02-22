import { UserIcon } from "lucide-react";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title"
            }
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text"
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" }
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Por gentileza, ponha uma categoria")
        }),
        defineField({
            name: "pitch",
            type: "markdown"
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required()
        })
    ]
});