import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Alert } from './Alert';

@Table({ tableName: 'machines', timestamps: false })
export class Machine extends Model<Machine> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @HasMany(() => Alert)
  declare alerts: Alert[];
} 