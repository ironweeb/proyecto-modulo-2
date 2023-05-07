module.exports = (hbs) => {
  hbs.registerHelper("eq", (a, b) => {
    return a === b;
  });

  hbs.registerHelper("inArray", (item, arr) => {
    return arr.some((el) => el._id.toString() === item.toString());
  });

  hbs.registerHelper("formatDate", (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });
};
