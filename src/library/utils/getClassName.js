import { transformToSnake } from './text';

export default function getClassName(classKeys, ...moreClasses) {
    const classNames = moreClasses.length > 0 ? [...moreClasses] : [];
    Object.keys(classKeys)
        .filter(k => classKeys[k])
        .map(key => classNames.push(transformToSnake(key)));

    return classNames.join(' ').trim();
}
