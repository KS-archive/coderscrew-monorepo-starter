import { opaque } from '@ccms/typings';

const typeSafePath = opaque<string, 'TypeSafePath'>();

export const createTypeSafePath = typeSafePath.create;
