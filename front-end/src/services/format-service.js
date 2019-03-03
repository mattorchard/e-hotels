const ShortDateFormatter = new Intl.DateTimeFormat("en-GB");
export const formatDateShort = date => ShortDateFormatter.format(date);
