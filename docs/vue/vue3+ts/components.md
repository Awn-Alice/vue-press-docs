# 自定义组件的多个 v-model

**这里主要体现实现多个 v-model 功能，ctx.emit('update:projectId', '123')**

```typescript
// robotIn.vue
<template>
    <ConditionForm v-model:projectId="projectId" v-model:passiveNum="passiveNum" v-model:supplierId="supplierId" v-model:groupIds="groupIds" />
</template>

<script lang="ts">
import ConditionForm from "../../components/robot/conditionForm.vue";
export default defineComponent({
    components: {
        ConditionForm
    }
})
</script>


// components/robot/conditionForm.vue
<template>
    <div>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="项目分组">
                <a-textarea v-model:value="project" spellcheck="false" :rows="2" placeholder="项目分组ID" style="width: 100%" />
            </a-form-item>
            <a-form-item label="被动机器人数量">
                <a-input-number v-model:value="passive" :min="0" :max="10000000" style="width: 100%" />
            </a-form-item>
            <a-form-item label="供应商类型">
                <a-select v-model:value="supplier" style="width: 100%">
                    <a-select-option v-for="sup in supplierList" :key="sup.supplierId">
                        {{ sup.supplierName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="群组ID">
                <a-textarea v-model:value="groupIds" placeholder="多个ID用英文输入法的逗号分隔开" :rows="4" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { watchEffect, ref } from "vue";
export default {
    props: {
        supplierId: String,
        passiveNum: Number,
        projectId: String,
        groupIds: String
    },
    setup(props, ctx) {
        const project = ref('')
        const supplier = ref('')
        const groupIds = ref('')
        const passive = ref(0)
        watchEffect(() => ctx.emit('update:projectId', project.value.trim()))
        watchEffect(() => ctx.emit('update:supplierId', supplier.value))
        watchEffect(() => ctx.emit('update:passiveNum', passive.value))
        watchEffect(() => ctx.emit('update:groupIds', groupIds.value.trim()))
    }
}
</script>

```
