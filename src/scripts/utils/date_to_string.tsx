export default function date_to_string(date: any) {
  return date.split('T')[0].split('-').reverse().join('. ');
}
