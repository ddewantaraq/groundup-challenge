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

  @Column({ type: DataType.DATE, allowNull: true })
  declare created_at?: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at?: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare created_by?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare updated_by?: string;
} 