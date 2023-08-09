import { join } from 'path';
import moduleAlias from 'module-alias';

moduleAlias.addAlias('@controllers', join(__dirname, '../controllers'));
moduleAlias.addAlias('@utils', join(__dirname, '../utils'));
moduleAlias.addAlias('@interfaces', join(__dirname, '../interfaces'));
moduleAlias.addAlias('@db', join(__dirname, '../db'));
