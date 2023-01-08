export const formatDateElapsed = (dateStr: string) => {
  const formatter = new Intl.RelativeTimeFormat("pl");
  const diff = new Date().getTime() - new Date(dateStr).getTime();
  var diffFormat = diff / 1000;

  if (diffFormat < 60) return "< 1 minutę temu";

  diffFormat /= 60;

  if (diffFormat < 1)
    return formatter.format(Math.trunc(-diffFormat * 60), "seconds");

  diffFormat /= 60;

  if (diffFormat < 1)
    return formatter.format(Math.trunc(-diffFormat * 60), "minutes");

  diffFormat /= 60;

  if (diffFormat < 1)
    return formatter.format(Math.trunc(-diffFormat * 60), "hours");

  diffFormat /= 24;

  return formatter.format(Math.trunc(-diffFormat * 24), "days");
};
