import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

type argsType = Array<string | Record<string, boolean>>;

const cx = (...args: argsType) => twMerge(classnames(...args));

export { cx };
