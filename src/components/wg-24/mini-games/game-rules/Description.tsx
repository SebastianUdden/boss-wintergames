import { Badge } from "@/components/wg-24/ui/badge";

interface IDescription {
  description?: string[];
  wordsToReplace: string[];
}

export const Description = ({ description, wordsToReplace }: IDescription) => {
  const replaceWordsWithBadges = (text: string) => {
    // This will handle replacing multiple words in a string
    const regex = new RegExp(`(${wordsToReplace.join("|")})`, "gi"); // Create a regex for all words to replace

    // Split the string based on the regex and map over the parts
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (wordsToReplace.includes(part)) {
        // If part is a word to replace, wrap it in a Badge
        return (
          <Badge
            key={index}
            className="px-2 py-0 treasure-badge text-[1.5vh] rounded-full"
          >
            {part}
          </Badge>
        );
      }
      // Otherwise, return the normal text part
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <ul>
      {description?.map((d, index) => (
        <li key={index} className="my-2 text-[1.5vh]">
          {replaceWordsWithBadges(d)}
        </li>
      ))}
    </ul>
  );
};