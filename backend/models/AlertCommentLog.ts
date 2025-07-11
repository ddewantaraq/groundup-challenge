import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Alert } from './Alert';

export interface AlertCommentLogCreationAttributes {
  alert_id: number;
  suspected_reason?: string;
  action?: string;
  comment?: string;
  updated_at?: Date;
  updated_by?: string;
}

@Table({ tableName: 'alert_comment_logs', timestamps: false })
export class AlertCommentLog extends Model<AlertCommentLog, AlertCommentLogCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Alert)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare alert_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare suspected_reason?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare action?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare comment?: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare created_at?: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at?: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare created_by?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare updated_by?: string;

  @BelongsTo(() => Alert)
  declare alert: Alert;
} 