const COPY_MENU_ITEM = "copy-text";

const documentUrlPatterns = ["https://*/*", "http://*/*"];

const contexts = ["bookmark", "link", "tab"];

browser.menus.create({
  id: COPY_MENU_ITEM,
  title: "Copy Text",
  documentUrlPatterns,
  contexts,
});

/**
 * Sets the text of the bookmark title once based on the id.
 *
 * @param {string} bookmarkId The id of the bookmarks used to get it's actual info
 */
const onBookmarkSelect = async (bookmarkId) => {
  const bookmarks = await browser.bookmarks.get(bookmarkId);
  console.log(bookmarks);

  if (bookmarks[0]?.title) {
    navigator.clipboard.writeText(bookmarks[0].title);
  }
};

/**
 *  Handles updating the txt in the clipboard if possible,
 *  will call bookmark if needed.
 */
browser.menus.onClicked.addListener((info, tab) => {
  const text = info.selectionText || info.linkText || tab?.title;

  console.log(info);

  if (text) {
    navigator.clipboard.writeText(text);
  }

  if (info.bookmarkId) {
    onBookmarkSelect(info.bookmarkId);
  }
});
